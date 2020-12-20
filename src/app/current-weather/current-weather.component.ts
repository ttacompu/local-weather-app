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

  getOrdinal(d) {
    const n = d
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }
}
