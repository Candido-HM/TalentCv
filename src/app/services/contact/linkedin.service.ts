import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {

  private API_URL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  createLinkedin(url: string): Observable<Response> {
    let ruta = `${this.API_URL}linkedin`;
    return this.http.post<Response>(ruta, url);
  }

  updateLinkedin(id: number, linkedin: any): Observable<Response> {
    let ruta = `${this.API_URL}linkedin/${id}`;
    return this.http.put<Response>(ruta, linkedin);
  } 

}
