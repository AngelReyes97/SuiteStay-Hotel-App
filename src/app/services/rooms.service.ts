import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rooms } from '../models/rooms.model';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl ='http://localhost:8080';

  constructor(private http: HttpClient) { }

  readonly Rooms$ = this.http.get<Rooms[]>(`${this.apiUrl}/available-rooms`)
  .pipe(
    catchError(error => {
      console.error('Error fetching rooms:', error);
      return of([]); // Return an observable with an empty array
    })
  );

}
