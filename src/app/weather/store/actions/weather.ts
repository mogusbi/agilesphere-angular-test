import { Action } from '@ngrx/store';

export enum WeatherActionTypes {
  PERSIST = '[Weather] Persist',
  SEARCH = '[Weather] Search'
}

export interface IPersistPayload {
  city: string;
  weather: {
    temperature: number;
    timestamp: number;
  }[];
}

export class Persist implements Action {
  public readonly type: WeatherActionTypes.PERSIST = WeatherActionTypes.PERSIST;

  constructor (
    public payload: IPersistPayload
  ) {}
}

export interface ISearchPayload {
  query: string;
}

export class Search implements Action {
  public readonly type: WeatherActionTypes.SEARCH = WeatherActionTypes.SEARCH;

  constructor (
    public payload: ISearchPayload
  ) {}
}

export type WeatherActions =
  | Persist
  | Search;
