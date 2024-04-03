import { Injectable } from '@angular/core';
import { Neighbours } from './utils/neighbours';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeighbourhoodService {
  // constructor(private http: HttpClient) {}

  getNeighbours(){
    let neighbours: Neighbours = {'establishment': 3, 'bank': 1, 'atm': 1, 'electronics_store': 1, 'restaurant': 1, 'hospital': 1, 'grocery_or_supermarket': 1, 'place_of_worship': 3, 'park': 1, 'school': 2, 'tourist_attraction': 1, 'mosque': 1, 'store': 2, 'clothing_store': 1}
    return neighbours ;
  }

  // fetchData(url: string): Observable<any> {
  //   return this.http.get(url);
  // }
}
