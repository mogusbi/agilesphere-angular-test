/**
 * I've chosen to disable the component-class-suffix rule as I believe you've made a conscience decision to
 * use container prefix rather than renaming this to WeatherComponent to satisfy the rule
 */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IWeatherState } from './store/reducers/weather';
import { getWeatherState } from './store/selectors/weather';
import { Search } from './store/actions/weather';

@Component({
  selector: 'app-weather',
  template: `
    <app-search (search)="citySearch($event)"></app-search>
    <app-results [data]="weather$ | async" [times]="times"></app-results>
  `
})
// tslint:disable-next-line:component-class-suffix
export class WeatherContainer implements OnInit {
  public times: string[] = [];

  public get weather$ (): Observable<IWeatherState> {
    return this.store.select(getWeatherState);
  }

  constructor (
    private store: Store<IWeatherState>
  ) {}

  public ngOnInit (): void {
    this.setTimes();
  }

  public citySearch (query: string): void {
    this.store.dispatch(new Search({
      query
    }));
  }

  private setTimes (): void {
    this.times = [
      '6 AM',
      '12 PM',
      '6 PM',
      '12 AM'
    ];
  }
}
