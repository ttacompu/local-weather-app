import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { ICurrentWeather } from '../icurrent-weather'
import { ICurrentWeatherData } from '../icurrent-weather-data'

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly currentWeather$ = new BehaviorSubject<ICurrentWeather>({
    city: '--',
    country: '--',
    date: new Date(),
    image: '',
    temperature: 0,
    description: '',
  })
  constructor(private httpClient: HttpClient) {}

  getCurrentWeather(search, country): Observable<any> {
    let uriParams = new HttpParams()
    if (typeof search === 'string') {
      uriParams = uriParams.set('q', country ? `${search},${country}` : search)
    } else {
      uriParams = uriParams.set('zip', search)
    }
    uriParams = uriParams.set('appid', environment.appId)
    return this.getCurrentWeatherHelper(uriParams)
  }

  getCurrentWeatherByCoords(coords) {
    const uriPrams = new HttpParams()
    uriPrams.set('lat', coords.latitude.toString())
    uriPrams.set('lon', coords.longitude.toString())
    return this.getCurrentWeatherHelper(uriPrams)
  }

  updateCurrentWeather(search, country) {
    this.getCurrentWeather(search, country).subscribe((weather) =>
      this.currentWeather$.next(weather)
    )
  }

  private getCurrentWeatherHelper(uriParams) {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => this.transformToICurrentWeather(data)))
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
