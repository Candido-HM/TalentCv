import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { userModel } from '../models/user.model';
import { profileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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

  getProfile(): Observable<Response> {
    let ruta = this.API_URL + 'profile';
    return this.http.get<Response>(ruta);
  }

  createProfile( profile: profileModel): Observable<Response> {
    let ruta = this.API_URL + 'profile';
    return this.http.post<Response>(ruta, profile);
  }
}
