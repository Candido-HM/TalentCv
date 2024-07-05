import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ubicationModel } from '../models/ubication.model';

@Injectable({
  providedIn: 'root'
})
export class UbicationService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) { }

  getUbication(): Observable<ubicationModel> {
    let ruta = `${this.API_URL}ubication`;
    return this.http.get<ubicationModel>(ruta).pipe(
      map((resp: any) => {
        return new ubicationModel(resp.data);
      })
    );
  }
}
