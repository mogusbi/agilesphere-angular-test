import { WeatherActions, WeatherActionTypes } from '../actions/weather';

export const initialState = {
  weather: null
};

export function weatherReducer (state = initialState, action: WeatherActions) {
  switch (action.type) {
  case WeatherActionTypes.PERSIST:
    return {
      weather: action.payload.weather
    };
  case WeatherActionTypes.SEARCH:
    return {
      weather: null
    };
  default:
    return state;
  }
}
