import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { ICurrentWeather } from '../icurrent-weather'
import { ICurrentWeatherData } from '../icurrent-weather-data'

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(city, country): Observable<any> {
    const params = { q: `${city},${country}`, APIkey: environment.appId }
    return this.httpClient
      .get(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather`, { params })
      .pipe(map((data: ICurrentWeatherData) => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: new Date(data.dt * 1000),
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    }
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }
}
