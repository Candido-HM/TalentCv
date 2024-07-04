import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCountryService {

  private apiUrl = 'https://api.countrystatecity.in/v1/';

  constructor( private http: HttpClient) { }

  getCountries(): Observable<any> {
    const ruta = `${this.apiUrl}countries`
    return this.http.get(ruta);
  }

  getStates(code: string): Observable<any> {
    const ruta = `${this.apiUrl}countries/${code}/states`;
    return this.http.get(ruta);
  }
  // code: string, state: string
  getCities(code: string, state: string): Observable<any> {
    const ruta = `${this.apiUrl}countries/${code}/states/${state}/cities`
    return this.http.get(ruta);
  }
}

