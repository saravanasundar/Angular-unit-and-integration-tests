import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Observable, of } from "rxjs";

import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";
import _heroes from "../mock/heroes.json";

let heroes: Hero[] = JSON.parse(JSON.stringify(_heroes));

const name: string = "Mr Dom";

// Mock hero service
class MockHeroService {
  getHeroes(): Observable<Hero[]> {
    return of(heroes);
  }

  addHero(): Observable<Hero> {
    return of({ id: 5, name: name, strength: 4 });
  }
}

// Mock router link directive
@Directive({
  selector: "[routerLink]",
  host: { "(click)": "onClick()" },
})
export class RouterLinkDirectiveSub {
  @Input("routerLink") linkParams: any;
  navigatedTo: any = null;

  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}

describe("HeroesComponent (deep tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveSub],
      providers: [HeroService],
      // schemas: [NO_ERRORS_SCHEMA],
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

  it("should call heroService.deleteHero when Hero component delete button is clicked (from parent)", () => {
    spyOn(fixture.componentInstance, "delete");
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponents[0]
      .query(By.css("button"))
      .triggerEventHandler("click", { stopPropagation: () => {} });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
  });

  it("should call heroService.deleteHero when Hero component delete button is clicked (from child)", () => {
    spyOn(fixture.componentInstance, "delete");
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // (<HeroComponent> heroComponents[0].componentInstance).delete.emit(undefined); // trgerring delete using componentInstance
    heroComponents[0].triggerEventHandler("delete", undefined); // trgerring delete using debugElement

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
  });

  it("should add a new hero to hero list when add button is clicked", () => {
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(
      By.css("input")
    ).nativeElement;
    const buttonElement = fixture.debugElement.query(By.css("button"));
    inputElement.value = name;
    buttonElement.triggerEventHandler("click", null);

    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;
    expect(heroText).toContain(name);
  });

  it("should have the correct route for the first hero", () => {
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveSub))
      .injector.get(RouterLinkDirectiveSub);

    heroComponents[0].query(By.css("a")).triggerEventHandler("click", null);

    expect(routerLink.navigatedTo).toBe("/detail/11");
  });
});
