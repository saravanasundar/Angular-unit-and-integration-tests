import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { HeroService } from "../hero.service";
import _heroes from "../mock/heroes.json";

describe("HeroDetailComponent", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;
  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return "3";
          },
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        { provide: HeroService, useValue: mockHeroService },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of(_heroes[0]));
  });

  it("should render hero name in h2 tag", () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css("h2")).nativeElement.textContent
    ).toBe(`${_heroes[0].name.toUpperCase()} Details`);
  });

  it("should call updateHero when save is called with done", (done) => {
    mockHeroService.updateHero.and.returnValue(of(null));

    // act
    fixture.detectChanges();
    fixture.componentInstance.save();

    // assert
    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      done();
    }, 3000);
  });

  it("should call updateHero when save is called with fakeAsync", fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of(null));

    // act
    fixture.detectChanges();
    fixture.componentInstance.save();
    // tick(300); // wait
    flush();

    // assert
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  it("should call updateHero when save is called with waitForAsync", waitForAsync(() => {
    mockHeroService.updateHero.and.returnValue(of(null));

    // act
    fixture.detectChanges();
    fixture.componentInstance.save();

    // assert
    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    }); // wait for promise which need to be resolved.
  }));
});
