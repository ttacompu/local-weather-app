import { Component, OnInit } from '@angular/core'

import { ICurrentWeather } from '../icurrent-weather'
import { WeatherService } from '../services/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather('Mahwah', 'US').subscribe((result: any) => {
      this.current = result
    })
  }
}
