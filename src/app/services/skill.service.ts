import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) { }

  getSkills(idSkill: number): Observable<Response> {
    let ruta = `${this.API_URL}${idSkill}/skill`;
    return this.http.get<Response>(ruta);
  }
}
