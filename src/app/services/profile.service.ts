import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) { }

  getProfile(): Observable<Response> {
    let ruta = this.API_URL + 'profile';
    return this.http.get<Response>(ruta);
  }
}
