/**
 * I've chosen to disable the component-class-suffix rule as I believe you've made a conscience decision to
 * use container prefix rather than renaming this to WeatherComponent to satisfy the rule
 */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Search } from './store/actions/weather';

@Component({
  selector: 'app-weather',
  template: `
    <app-search (search)="citySearch($event)"></app-search>
    <app-results></app-results>
  `
})
// tslint:disable-next-line:component-class-suffix
export class WeatherContainer {
  constructor (
    private store: Store<any> // TODO: Replace this with a type
  ) {}

  public citySearch (query: string): void {
    this.store.dispatch(new Search({
      query
    }));
  }
}
