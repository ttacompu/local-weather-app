import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ObservablePropertyStrategy, autoSpyObj, injectSpy } from 'angular-unit-test-helper';

import { MaterialModule } from '../material.module';
import { PostalService } from '../services/postal.service';
import { WeatherService } from '../services/weather.service';
import { CitySearchComponent } from './city-search.component';

describe('CitySearchComponent', () => {
  let component: CitySearchComponent;
  let fixture: ComponentFixture<CitySearchComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>
  let postalServiceMock: jasmine.SpyObj<PostalService>

  beforeEach(async(() => {
    const weatherServiceSpy = autoSpyObj(
      WeatherService,
      ['currentWeather$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    const postalServiceSpy =
    jasmine.createSpyObj(
      'PostalService',
      ['resolvePostalCode']
    )

    TestBed.configureTestingModule({
      declarations: [CitySearchComponent],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy },
        {provide : PostalService, useValue : postalServiceSpy}
      ],
    }).compileComponents()

    weatherServiceMock = injectSpy(WeatherService)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
