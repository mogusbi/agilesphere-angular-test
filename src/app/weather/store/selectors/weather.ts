import { createFeatureSelector } from '@ngrx/store';
import { IWeatherState } from '../reducers/weather';

export const getWeatherState = createFeatureSelector<IWeatherState>('weather');
