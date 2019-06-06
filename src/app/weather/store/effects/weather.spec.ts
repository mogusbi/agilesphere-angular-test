import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { WeatherService } from '../../weather.service';
import { Error, Persist, Search } from '../actions/weather';
import { WeatherEffects } from './weather';

describe('WeatherEffects', (): void => {
  let actions$: Observable<{}>; // You could also create an ActionsMock class to reuse elsewhere
  let effects: WeatherEffects;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$),
        {
          provide: WeatherService,
          useValue: {
            searchWeatherForCity: jasmine.createSpy()
          }
        }
      ]
    });

    effects = TestBed.get(WeatherEffects);
    weatherService = TestBed.get(WeatherService);
  });

  describe('retrieveWeather$', (): void => {
    it('should dispatch Persist if request is successful', (): void => {
      const response = cold('-a|', {
        a: {
          city: {
            name: 'Edinburgh'
          },
          list: [
            {
              dt: 1559779200,
              main: {
                temp: 11.24
              }
            },
            {
              dt: 1559854800,
              main: {
                temp: 13.58
              }
            }
          ]
        }
      });

      weatherService.searchWeatherForCity.and.returnValue(response);

      const action = new Search({
        query: 'Edinburgh'
      });
      const complete = new Persist({
        city: 'Edinburgh',
        weather: [
          {
            temperature: 11.24,
            timestamp: 1559779200
          },
          {
            temperature: 13.58,
            timestamp: 1559854800
          }
        ]
      });

      actions$ = hot('-a', {
        a: action
      });

      const expected = cold('--b', {
        b: complete
      });

      expect(effects.retrieveWeather$).toBeObservable(expected);
    });

    it('should dispatch Error if request is unsuccessful', (): void => {
      const response = cold('-#|');

      weatherService.searchWeatherForCity.and.returnValue(response);

      const action = new Search({
        query: 'Edinburgh'
      });
      const complete = new Error();

      actions$ = hot('-a', {
        a: action
      });

      const expected = cold('--b', {
        b: complete
      });

      expect(effects.retrieveWeather$).toBeObservable(expected);
    });
  });
});
