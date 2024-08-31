import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private API_URL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  createGithub(url: string): Observable<Response> {
    let ruta = `${this.API_URL}github`;
    return this.http.post<Response>(ruta, url);
  }

  updateGithub(id: number, github: any): Observable<Response> {
    let ruta = `${this.API_URL}github/${id}`;
    return this.http.put<Response>(ruta, github);
  }
}
