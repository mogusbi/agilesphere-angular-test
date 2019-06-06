import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as moment from 'moment';
import { IWeatherState } from '../../store/reducers/weather';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  @Input() public data: IWeatherState;
  @Input() public times: string[] = [];

  public get isError (): boolean {
    return this.data.error;
  }

  public get isLoading (): boolean {
    return this.data.loading;
  }

  public get showResults (): boolean {
    return this.data.city && this.data.weather.length > 0;
  }

  public getTemperature (time: string): number {
    const result = this.data
      .weather
      .find(({timestamp}) => moment
        .unix(timestamp)
        .utc()
        .format('h A') === time);

    if (result) {
      return result.temperature;
    }

    return null;
  }
}
