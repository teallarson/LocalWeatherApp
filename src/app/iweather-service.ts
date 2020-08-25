import {Observable} from 'rxjs';
import {ICurrentWeather} from './icurrent-weather'

export interface IWeatherService {
  getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather>;
}
