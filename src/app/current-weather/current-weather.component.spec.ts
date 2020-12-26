import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { ObservablePropertyStrategy, autoSpyObj, injectSpy } from 'angular-unit-test-helper'
import { Observable } from 'rxjs'
import { BehaviorSubject, of } from 'rxjs'

import { MaterialModule } from '../material.module'
import { WeatherService } from '../services/weather.service'
import { fakeWetherModel } from '../services/weatherFake.service'
import { CurrentWeatherComponent } from './current-weather.component'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>

  beforeEach(async( ()=>{
    const weatherServiceSpy = autoSpyObj(
      WeatherService,
      ['currentWeather$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      imports: [MaterialModule],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents()

    weatherServiceMock = injectSpy(WeatherService)

  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
  })

  it('should create weather component', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWetherModel))
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
