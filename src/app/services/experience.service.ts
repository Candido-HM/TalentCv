import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, reduce } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { experienceModel } from '../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) { }

  getExperiences(): Observable<experienceModel[]> {
    let ruta = `${this.API_URL}experience`;
    return this.http.get<experienceModel[]>(ruta);
  }

  saveExperience() {
    // Aqui va el codigo para guardar
  }

  getExperience(id: number): Observable<experienceModel> { 
    let ruta = `${this.API_URL}experience/${id}`;
    return this.http.get<experienceModel>(ruta);
  }

  updateExperience() {
    // Aqui va el codigo actualizar
  }

  deleteExperience() {
    //Aqui va el codigo de eliminacion
  }

}
