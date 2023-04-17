import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { Hero } from "../hero";

import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

// Mock hero service
class MockHeroService {
  getHeroes(): Observable<Hero[]> {
    return of([
      { id: 11, name: "Mr. Nice", strength: 10 },
      { id: 12, name: "Narco", strength: 5 },
      { id: 13, name: "Bombasto", strength: 8 },
    ]);
  }
}

// Fake child component
@Component({
  selector: "app-hero",
  template: "<div></div> ",
})
class FakeHeroComponent {
  @Input() hero: Hero;
}

describe("HeroesComponent (shallow test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes;

  beforeEach(() => {
    heroes = [
      { id: 11, name: "Mr. Nice", strength: 10 },
      { id: 12, name: "Narco", strength: 5 },
      { id: 13, name: "Bombasto", strength: 8 },
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]); // createSpy object not working dont know the reason, getting NullInjectorError: No provider for HttpClient!.
    // Added Mock service in test file and added override function to add mockservice

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        // {
        //   provide: HeroService,
        //   userValue: MockService
        // },
        HeroService,
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    });

    TestBed.overrideProvider(HeroService, { useValue: new MockHeroService() }); // Overided service with mock service created above

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("Should get heroes correctly from the service", () => {
    // mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it("Should create one li element for each hero", () => {
    // mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(3);
  });
});
