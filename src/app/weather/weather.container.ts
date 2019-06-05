/**
 * I've chosen to disable the component-class-suffix rule as I believe you've made a conscience decision to
 * use container prefix rather than renaming this to WeatherComponent to satisfy the rule
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  template: `
    <app-search></app-search>
    <app-results></app-results>
  `
})
// tslint:disable-next-line:component-class-suffix
export class WeatherContainer implements OnInit {
  public ngOnInit (): void {}

  public citySearch (): void {}
}
