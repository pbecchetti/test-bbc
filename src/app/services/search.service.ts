import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  today = new Date().toISOString();

  // API urls from blablacar
  APIKEY = environment.APIKEY;
  private baseAPI = 'https://public-api.blablacar.com/api';
  private getTripsURL =
    '/v3/trips?key=' +
    this.APIKEY +
    '&from_coordinate=48.8566%2C2.3522&to_coordinate=45.764043%2C4.835659&from_country=FR&to_country=FR&locale=en-GB&start_date_local=' +
    this.today +
    '&currency=EUR';
  private tripURL = '/v2/trips';

  constructor(private http: HttpClient) {}

  // Get list of trips
  getList(): Observable<any> {
    return this.http
      .get(this.baseAPI + this.getTripsURL)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Get info about one particular trip (with trip ID as a parameter)
  getTrip(tripID: string): Observable<any> {
    return this.http
      .get(this.baseAPI + this.tripURL + '/' + tripID + '?key=' + this.APIKEY)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    let errorCode = error.status;
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorCode);
  }
}
