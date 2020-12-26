import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { debounceTime, filter, map, tap } from 'rxjs/operators'

import { PostalService } from '../services/postal.service'
import { WeatherService } from '../services/weather.service'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
})
export class CitySearchComponent implements OnInit {
  search = new FormControl('', [Validators.minLength(2)])
  constructor(private weatherService: WeatherService, private PostalService : PostalService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        filter(() => !this.search.invalid),
        map((val) => this.parseInput(val) )
      )
      .subscribe(({searchVal, country }) => {
        this.PostalService.resolvePostalCode(searchVal).subscribe( result =>{
          if(searchVal && searchVal.latitude){
            this.weatherService.getCurrentWeatherByCoords(searchVal)
          }else{
            this.weatherService.updateCurrentWeather(searchVal, country)
          }

        });

      })
  }

  private parseInput(searchValue) {
    const userInput = searchValue.split(',').map((s) => s.trim())
    return  ({searchVal : userInput[0], country : userInput.length > 1 ? userInput[1] : undefined });
  }
}
