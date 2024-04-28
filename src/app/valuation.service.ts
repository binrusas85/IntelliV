import { Injectable } from '@angular/core';
import { Neighbours } from './utils/neighbours';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValuationService {

  private baseUrl: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // fetchData(lat:number, lng:number, radious:number=1000, url: string = 'http://127.0.0.1:8000/nearby_places'): Observable<Neighbours> {
  //   let request: string = `${url}/?lat=${lat}&lng=${lng}&radious=${radious}` 
  //   return this.http.get<Neighbours>(request);
  // }

  // Send data with POST request
  sendData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/predict`, data);
  }

}
