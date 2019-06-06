import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { WeatherContainer } from './weather.container';
import { Search } from './store/actions/weather';
import { IWeatherState } from './store/reducers/weather';

describe('WeatherContainer', () => {
  let fixture: ComponentFixture<WeatherContainer>;
  let instance: WeatherContainer;
  let store: jasmine.SpyObj<Store<IWeatherState>>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherContainer
      ],
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy(),
            select: jasmine.createSpy()
          }
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(WeatherContainer);
    instance = fixture.componentInstance;

    store = TestBed.get(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(instance).toBeTruthy();
  });

  it('should define the desired times', (): void => {
    expect(instance.times).toEqual([
      '6 AM',
      '12 PM',
      '6 PM',
      '12 AM'
    ]);
  });

  describe('weather$', (): void => {
    it('should return the weather from the state', (): void => {
      const weather = cold('-a', {
        a: {
          error: false,
          loading: false,
          results: [
            {
              city: 'Cardiff',
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
            }
          ]
        }
      });

      store.select.and.returnValue(weather);

      expect(instance.weather$).toBeObservable(weather);
    });
  });

  describe('citySearch', (): void => {
    it('should dispatch Search with the correct payload', (): void => {
      instance.citySearch('Cardiff');

      expect(store.dispatch).toHaveBeenCalledWith(new Search({
        query: 'Cardiff'
      }));
    });
  });
});
