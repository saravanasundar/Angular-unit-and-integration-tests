import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent (Shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Hero1', strength: 10 };

    expect(fixture.componentInstance.hero.name).toEqual('Hero1');
  });
});
