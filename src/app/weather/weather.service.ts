import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Weather } from '../model';

@Injectable()
export class WeatherService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(
    private httpClient: HttpClient
  ) {}

  /**
   * Errors are being caught in the Effect rather than doing it upfront in the service
   * in order to dispatch an error action to show a message to the end user
   */
  public searchWeatherForCity (city: string): Observable<Weather> {
    const params = this.generateParams(city);

    return this.httpClient
      .get(this.url, {
        params
      });
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
