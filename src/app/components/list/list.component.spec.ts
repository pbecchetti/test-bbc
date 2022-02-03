import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListComponent } from './list.component';

describe('SearchComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
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

  // it('should display details trips if there is one or more trips', () => {
  //   component.trips = [
  //     {
  //       link: 'https://www.blablacar.co.uk/trip?source=CARPOOLING&id=2386665573-cormeilles-en-parisis-lyon',
  //       waypoints: [
  //         {
  //           date_time: '2022-02-04T18:20:00',
  //           place: {
  //             city: 'Cormeilles-en-Parisis',
  //             address: 'Gare de Cormeilles en Parisis, Cormeilles-en-Parisis',
  //             latitude: 48.967918,
  //             longitude: 2.193881,
  //             country_code: 'FR',
  //           },
  //         },
  //         {
  //           date_time: '2022-02-04T23:50:00',
  //           place: {
  //             city: 'Lyon',
  //             address: '84 Quai Perrache, Lyon',
  //             latitude: 45.734627,
  //             longitude: 4.818189,
  //             country_code: 'FR',
  //           },
  //         },
  //       ],
  //       price: {
  //         amount: '36.00',
  //         currency: 'EUR',
  //       },
  //       vehicle: {
  //         make: 'AUDI',
  //         model: 'A3',
  //       },
  //       distance_in_meters: 482597,
  //       duration_in_seconds: 19800,
  //     },
  //   ];
  //   const firstTrip = fixture.debugElement.query(
  //     By.css('.trip .trip-data')
  //   ).nativeElement;
  //   console.log(firstTrip);
  //   // expect(emptyDiv.textContent).toContain('No trips to show');
  // });
});
