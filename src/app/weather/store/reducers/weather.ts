import { WeatherActions, WeatherActionTypes } from '../actions/weather';

export interface IWeatherState {
  city: string;
  error: boolean;
  loading: boolean;
  weather: {
    temperature: number;
    timestamp: number;
  }[];
}

export const initialState: IWeatherState = {
  city: null,
  error: false,
  loading: false,
  weather: null
};

export function weatherReducer (state = initialState, action: WeatherActions) {
  switch (action.type) {
  case WeatherActionTypes.ERROR:
    return {
      ...state,
      error: true,
      loading: false
    };
  case WeatherActionTypes.PERSIST:
    return {
      city: action.payload.city,
      loading: false,
      weather: action.payload.weather
    };
  case WeatherActionTypes.SEARCH:
    return {
      ...state,
      error: false,
      loading: true
    };
  default:
    return state;
  }
}
