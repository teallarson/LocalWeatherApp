import { Injectable } from '@angular/core';
import {IWeatherService} from './iweather-service';
import {ICurrentWeather} from './icurrent-weather';
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class WeatherServiceFake implements IWeatherService {
    private fakeWeather: ICurrentWeather = {
      city: 'Redmond',
      country: 'US',
      date: new Date(),
      image: '',
      temperature: 65,
      description: 'light drizzle'
    }
  

  constructor() { }
  getCurrentWeather(search: string | number, country?: string):Observable<ICurrentWeather>{
    return of(this.fakeWeather);
  
  }
}
