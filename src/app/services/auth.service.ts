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
  userToken: any;
  constructor( private http: HttpClient) {
    this.userToken = '';
  }

  login( user: loginModel): Observable<Response> {
    let direccion = this.API_URL + 'login';
    return this.http.post<Response>(direccion, user);
  }

  saveToken(tokenId: string) {
    this.userToken = tokenId;
    localStorage.setItem('user_token', tokenId);
  }

  leerToken() {
    if(localStorage.getItem('user_token')) {
      this.userToken = localStorage.getItem('user_token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  authenticated(): boolean {
    if (this.userToken.length < 20) {
      return false;
    } else {
      return true;
    }
  }

  logout(): Observable<Response> {
    let direccion = this.API_URL + 'logout';
    return this.http.get<Response>(direccion);
  }
  
}
