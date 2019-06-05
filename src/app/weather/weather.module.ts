import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { weatherReducer } from './store/reducers/weather';
import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';

// IF YOU DECIDE TO USE NG-RX YOU'LL NEED TO UNCOMMENT SOME LINES

// import { EffectsModule } from '@ngrx/effects';
// import { reducers, effects } from './store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('weather', weatherReducer)
    // EffectsModule.forFeature(effects)
  ],
  declarations: [
    ResultsComponent,
    SearchComponent,
    WeatherContainer
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule {}
