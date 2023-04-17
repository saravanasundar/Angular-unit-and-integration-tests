import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Observable, of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

let heroes: Hero[] = [
  { id: 11, name: "Mr. Nice", strength: 10 },
  { id: 12, name: "Narco", strength: 5 },
  { id: 13, name: "Bombasto", strength: 8 },
];

// Mock hero service
class MockHeroService {
  getHeroes(): Observable<Hero[]> {
    return of(heroes);
  }
}

describe("HeroesComponent (deep tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [HeroService],
      schemas: [NO_ERRORS_SCHEMA],
    });

    TestBed.overrideProvider(HeroService, { useValue: new MockHeroService() }); // Overided service with mock service created above

    fixture = TestBed.createComponent(HeroesComponent);
  });

  //   checking whether hercomponent is rendered in UI using debugElement queryAll with By.directive method
  it("should render each hero as HeroComponent", () => {
    fixture.detectChanges(); // run ngOnInit

    let heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentsDEs.length).toBe(3);
    for (let i = 0; i < heroComponentsDEs.length; i++) {
      expect(heroComponentsDEs[i].componentInstance.hero.name).toEqual(
        heroes[i].name
      ); // debugging to child compoennt and checking value.
    }
  });
});
