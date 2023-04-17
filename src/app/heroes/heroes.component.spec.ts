import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let heroes;
  let mockHeroService;

  beforeEach(() => {
    heroes = [
      { id: 11, name: 'Mr. Nice', strength: 10 },
      { id: 12, name: 'Narco', strength: 5 },
      { id: 13, name: 'Bombasto', strength: 8 },
    ]; // mock heroes data

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]); // Mocking service used in component

    component = new HeroesComponent(mockHeroService);
  });

  describe('Get heroes', () => {
    it('should get heroes data', () => {
      // arrange
      mockHeroService.getHeroes.and.returnValue(of(heroes));

      // act
      component.ngOnInit();

      // assert
      expect(component.heroes.length).toEqual(heroes.length);
    });
  });

  describe('add heroes', () => {
    it('should add hero data', () => {
      // arrange
      mockHeroService.addHero.and.returnValue(
        of({
          name: 'Saravana',
        })
      );
      component.heroes = heroes;

      // act
      component.add('Saravana');

      // assert
      expect(component.heroes.find((x) => x.name === 'Saravana')).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heros list', () => {
      // arrange
      mockHeroService.deleteHero.and.returnValue(of(true)); // mocking data from service
      component.heroes = heroes;

      // act
      component.delete(heroes[2]);

      // assert
      expect(component.heroes.length).toEqual(2);
    });

    it('should call deleteHero with indicated hero', () => {
      // arrange
      mockHeroService.deleteHero.and.returnValue(of(true)); // mocking data from service
      component.heroes = heroes;

      // act
      component.delete(heroes[2]);

      // assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]); // checking whether delete service is called
    });
  });
});
