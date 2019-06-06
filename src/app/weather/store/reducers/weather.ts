import { WeatherActions, WeatherActionTypes } from '../actions/weather';

export interface IWeatherState {
  error: boolean;
  loading: boolean;
  results: {
    city: string;
    weather: {
      temperature: number;
      timestamp: number;
    }[];
  }[];
}

export const initialState: IWeatherState = {
  error: false,
  loading: false,
  results: []
};

export function weatherReducer (state = initialState, action: WeatherActions): IWeatherState {
  switch (action.type) {
  case WeatherActionTypes.ERROR:
    return {
      ...state,
      error: true,
      loading: false
    };
  case WeatherActionTypes.PERSIST:
    return {
      ...state,
      loading: false,
      results: [
        ...state.results,
        action.payload
      ]
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
