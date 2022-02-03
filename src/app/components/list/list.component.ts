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

  currentPage = 1;
  limit = 2;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    console.log(new Date().toISOString());
    this.searchService.getList().subscribe((resultTrips) => {
      console.log(resultTrips);
      this.numberTrips = resultTrips.search_info.count;
      this.trips = resultTrips.trips;
      this.trips.forEach((trip) => {
        this.searchService
          .getTrip(trip.link.split('id=')[1])
          .subscribe((resultTrip) => {
            // console.log(resultTrip);
            trip.depart = resultTrip.departure_place.address;
            trip.arrival = resultTrip.arrival_place.address;
            trip.seatLefts = resultTrip.seats_left;
          });
      });
    });
  }
}
