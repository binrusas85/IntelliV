import { Injectable } from '@angular/core';
import { Neighbours } from './utils/neighbours';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeighbourhoodService {

  constructor(private http: HttpClient) {}

  // getNeighbours(){
  //   let neighbours: Neighbours = {'hospital': 3, 'pharmacy': 4, 'supermarket': 8, 'school': 16, 'shopping_mall': 11, 'mosque': 3, 'bank': 1, 'bakery': 10, 'park': 3, 'restaurant': 20, 'cafe': 18, 'gym': 3, 'lodging': 11, 'laundry': 7}
  //   return neighbours ;
  // }

  fetchData(lat:number, lng:number, radious:number=2000, url: string = 'http://127.0.0.1:8000/nearby_places'): Observable<Neighbours> {
    let request: string = `${url}/?lat=${lat}&lng=${lng}&radious=${radious}` 
    return this.http.get<Neighbours>(request);
  }
}
