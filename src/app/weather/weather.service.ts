import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Weather } from '../model';

@Injectable()
export class WeatherService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(
    private httpClient: HttpClient
  ) {}

  public searchWeatherForCity (city: string): Observable<Weather> {
    const params = this.generateParams(city);

    return this.httpClient
      .get(this.url, {
        params
      })
      .pipe(
        catchError(
          ({message}: HttpErrorResponse) => {
            /**
             * A more user friendly approach would be to catch the error in the effect and dispatch a message
             * action that would display it in app for the user to see.
             */
            console.error(message);

            return null;
          }
        )
      );
  }

  private generateParams (q: string) {
    return {
      APPID: '010721642521f31b0fbc8c3831d45951',
      cnt: '8',
      q,
      units: 'metric'
    };
  }
}
