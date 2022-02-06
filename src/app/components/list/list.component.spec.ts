import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

import { ListComponent } from './list.component';

describe('SearchComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let searchServiceSpy: jasmine.SpyObj<SearchService>;

  //fake data
  const expectedTrips = {
    data: {
      link: 'https://www.blablacar.co.uk/search?fc=48.8566,2.3522&tc=45.764043,4.835659&fn=Paris&tn=Lyon&db=2022-02-06&de=2022-02-06',
      search_info: {
        count: 5,
        full_trip_count: 0,
      },
      trips: [
        {
          link: 'https://www.blablacar.co.uk/trip?source=CARPOOLING&id=2386665573-cormeilles-en-parisis-lyon',
          waypoints: [
            {
              date_time: '2022-02-06T14:20:00',
              place: {
                city: 'Cormeilles-en-Parisis',
                address: 'Gare de Cormeilles en Parisis, Cormeilles-en-Parisis',
                latitude: 48.967918,
                longitude: 2.193881,
                country_code: 'FR',
              },
            },
            {
              date_time: '2022-02-006T23:50:00',
              place: {
                city: 'Lyon',
                address: '84 Quai Perrache, Lyon',
                latitude: 45.734627,
                longitude: 4.818189,
                country_code: 'FR',
              },
            },
          ],
          price: {
            amount: '36.00',
            currency: 'EUR',
          },
          vehicle: {
            make: 'AUDI',
            model: 'A3',
          },
          distance_in_meters: 482597,
          duration_in_seconds: 19800,
        },
      ],
    },
  };

  beforeEach(async () => {
    const searchServiceSpyObj = jasmine.createSpyObj('SearchService', [
      'getList',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: SearchService, useValue: searchServiceSpyObj }],
    }).compileComponents();

    searchServiceSpy = TestBed.inject(
      SearchService
    ) as jasmine.SpyObj<SearchService>;
    searchServiceSpy.getList.and.returnValue(
      of(expectedTrips).pipe(
        map((res) => {
          console.log('results', res);
          res.data.trips;
        })
      )
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No trips to show" if there are no trips', () => {
    component.trips = [];
    const noTripsToShow = fixture.debugElement.query(
      By.css('.no-trip')
    ).nativeElement;
    expect(noTripsToShow.textContent).toContain('No trips to show');
  });

  it('should return expected trips', () => {
    // Check requests
    expect(searchServiceSpy.getList.calls.count())
      .withContext('one call')
      .toBe(1);
    expect(searchServiceSpy.getList).toHaveBeenCalled();

    // check results
    console.log(fixture.componentInstance.numberTrips);
    expect(fixture.componentInstance.trips.length).toEqual(1);
  });
});
