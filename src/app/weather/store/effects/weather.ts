import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Weather, WeatherList } from '../../../model';
import { WeatherService } from '../../weather.service';
import { Error, Persist, Search, WeatherActionTypes } from '../actions/weather';

@Injectable()
export class WeatherEffects {
  @Effect()
  public retrieveWeather$: Observable<Persist | Error> = this.actions$
    .pipe(
      ofType(WeatherActionTypes.SEARCH),
      switchMap(
        ({payload: {query}}: Search) => this.weatherService
          .searchWeatherForCity(query)
          .pipe(
            map(
              ({city: {name}, list}: Weather): Persist => new Persist({
                city: name,
                weather: WeatherEffects.convertToState(list)
              })
            ),
            catchError(
              () => of(new Error())
            )
          )
      )
    );

  constructor (
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  private static convertToState (list: WeatherList[]) {
    return list.map((item: WeatherList) => ({
      temperature: item.main.temp,
      timestamp: item.dt
    }));
  }
}
