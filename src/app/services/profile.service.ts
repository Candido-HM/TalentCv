import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { profileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) { }

  getProfiles(): Observable<profileModel[]> { 
    let ruta = `${this.API_URL}profile`;
    return this.http.get<profileModel[]>(ruta);
  }

  getProfile(id: number): Observable<profileModel> {
    let  ruta = `${this.API_URL}profile/${id}`;
    return this.http.get<profileModel>(ruta).pipe(
      map((resp: any) => {
        return new profileModel(resp.data);
      })
    );
  }

  createProfile( profile: profileModel): Observable<Response> {
    let ruta = this.API_URL + 'profile';
    return this.http.post<Response>(ruta, profile);
  }

  updateProfile( id: number, profile: profileModel ): Observable<Response> {
    let ruta = `${this.API_URL}profile/${id}`;
    return this.http.put<any>(ruta, profile);
  }
}
