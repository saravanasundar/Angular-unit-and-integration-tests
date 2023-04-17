import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';

describe('HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA] // to avoid validation in html template
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Hero1', strength: 10 };
    fixture.detectChanges();

    expect(fixture.componentInstance.hero.name).toEqual('Hero1');
  });

  it('should render hero name in anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Hero1', strength: 10 };
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('a')); //debugElement is the wrapper around DOM 
    expect(de.nativeElement.textContent).toContain('Hero1');
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('Hero1'); // fixture is the wrapper around component.
  })
});
