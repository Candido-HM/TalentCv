import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { userModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) { }

  getUser(): Observable<userModel> {
    let ruta = this.API_URL+'dashboard-user';
    return this.http.get<any>(ruta).pipe(
      map((resp: any) => {
        return new userModel(resp.data);
      })
    );
  }

  updateUser(id: number, user: userModel ): Observable<Response> {
    let ruta = `${this.API_URL}dashboard-user/${id}`;
    return this.http.put<any>(ruta, user);
  }
}
