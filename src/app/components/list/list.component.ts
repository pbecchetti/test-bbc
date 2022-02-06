import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  trips: any[] = [];
  numberTrips: number = 0;
  message: string = '';

  currentPage = 1;
  limit = 2;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getList().subscribe(
      (resultTrips) => {
        this.numberTrips = resultTrips.search_info.count;
        this.trips = resultTrips.trips;
        this.trips.forEach((trip) => {
          this.searchService
            .getTrip(trip.link.split('id=')[1])
            .subscribe((resultTrip) => {
              trip.depart = resultTrip.departure_place.address;
              trip.arrival = resultTrip.arrival_place.address;
              trip.seatLefts = resultTrip.seats_left;
            });
        });
      },
      (err) => {
        switch (err) {
          case 400:
            this.message =
              'Something is wrong, please check the parameters of the query and their formats or contact us';
            break;
          case 404:
            this.message =
              'Something is wrong, please check your API key or contact us';
            break;
          case 429:
            this.message =
              'You reached the quota of requests, you can contact us';
            break;
          default:
            this.message = 'something is wrong, please contact us';
        }
      }
    );
  }
}
