import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { formationModel } from '../models/formation.model';
import { ResolveEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient ) { }

  getFormations(): Observable<formationModel[]> { 
    let ruta = `${this.API_URL}formation`;
    return this.http.get<formationModel[]>(ruta);
  }

  saveFormation(formation: formationModel): Observable<Response> {
    let ruta = `${this.API_URL}formation`;
    return this.http.post<Response>(ruta, formation);
   }

  getFormation(id: number): Observable<formationModel> {
    let ruta = `${this.API_URL}formation/${id}`;
    return this.http.get<formationModel>(ruta).pipe(
      map((resp: any) => {
        return new formationModel(resp.data);
      })
    );
   }

  updateFormation(id: number, formation: formationModel): Observable<Response> {
    let ruta = `${this.API_URL}formation/${id}`;
    return this.http.put<Response>(ruta, formation);
  }

  deleteFormation(id: number): Observable<Response> {
    let ruta = `${this.API_URL}formation/${id}`;
    return this.http.delete<Response>(ruta);
   }
}
