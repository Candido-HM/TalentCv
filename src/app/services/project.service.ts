import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { projectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) { }

  getProjects(): Observable<projectModel[]> {
    let ruta = `${this.API_URL}project`;
    return this.http.get<projectModel[]>(ruta);
  }

  saveProject() {}

  getProject(id: number): Observable<projectModel> {
    let ruta = `${this.API_URL}project/${id}`;
    return this.http.get<projectModel>(ruta).pipe(
      map( (resp: any) => {
        return new projectModel(resp.data);
      })
    );
  }

  updateProject() {}

  deleteProject() {}
}
