import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { formationModel } from '../models/formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient ) { }

  getFormations(idProfile: number): Observable<formationModel[]> { 
    let ruta = `${this.API_URL}${idProfile}/formation`;
    return this.http.get<formationModel[]>(ruta);
  }

  saveFormation(idProfile: number, formation: formationModel): Observable<Response> {
    let ruta = `${this.API_URL}${idProfile}/formation`;
    return this.http.post<Response>(ruta, formation);
   }

  getFormation(idProfile: number, id: number): Observable<formationModel> {
    let ruta = `${this.API_URL}${idProfile}/formation/${id}`;
    return this.http.get<formationModel>(ruta).pipe(
      map((resp: any) => {
        return new formationModel(resp.data);
      })
    );
   }

  updateFormation(idProfile: number, id: number, formation: formationModel): Observable<Response> {
    let ruta = `${this.API_URL}${idProfile}/formation/${id}`;
    return this.http.put<Response>(ruta, formation);
  }

  deleteFormation(idProfile: number, id: number): Observable<Response> {
    let ruta = `${this.API_URL}${idProfile}/formation/${id}`;
    return this.http.delete<Response>(ruta);
   }
}
