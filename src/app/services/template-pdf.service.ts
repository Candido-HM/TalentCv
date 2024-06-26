import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplatePdfService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) { }

  getTemplate(id: number): Observable<Blob> {
    return this.http.get(`${this.API_URL}viewPDF/${id}`, { responseType: 'blob'});
  }
}
