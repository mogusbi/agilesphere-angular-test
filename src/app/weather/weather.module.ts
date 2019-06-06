import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { WeatherEffects } from './store/effects/weather';
import { weatherReducer } from './store/reducers/weather';
import { WeatherContainer } from './weather.container';
import { WeatherService } from './weather.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      WeatherEffects
    ]),
    ReactiveFormsModule,
    StoreModule.forFeature('weather', weatherReducer)
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
