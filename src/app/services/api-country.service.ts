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
}

