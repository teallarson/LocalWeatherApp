import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ICurrentWeather } from './icurrent-weather';
import {ICurrentWeatherData} from './icurrent-weather-data';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {IWeatherService} from './iweather-service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(search: string | number, country?: string){

    let uriParams = '';
    if (typeof search === 'string'){
      uriParams = `q=${search}`
    } else {
      uriParams = `zip=${search}`
    }

    if (country) {
      uriParams = `${uriParams},${country}`;
    }

    return this.httpClient.get<ICurrentWeatherData>(`https://api.openweathermap.org/data/2.5/weather?${uriParams}&appid=${environment.appId}`).pipe(
      map(data => this.transformToICurrentWeather (data))
    )    
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather{
    return {
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      temperature: data.main.temp * 9/5 - 459.67,
      image: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      date: new Date(data.dt * 1000)
    }
  }
}


