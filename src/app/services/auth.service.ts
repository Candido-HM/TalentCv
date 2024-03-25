import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { loginModel } from '../models/loginUser.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL: string = environment.apiURL;
  constructor( private http: HttpClient) { }

  login( user: loginModel): Observable<Response> {
    let direccion = this.API_URL + 'login';
    return this.http.post<Response>(direccion, user);
  }
  
}
