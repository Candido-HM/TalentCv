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

  saveProject(project: projectModel): Observable<Response> {
    let ruta = `${this.API_URL}project`;
    return this.http.post<Response>(ruta, project);
  }

  getProject(id: number): Observable<projectModel> {
    let ruta = `${this.API_URL}project/${id}`;
    return this.http.get<projectModel>(ruta).pipe(
      map( (resp: any) => {
        return new projectModel(resp.data);
      })
    );
  }

  updateProject(id: number, project: projectModel): Observable<Response> {
    let ruta = `${this.API_URL}project/${id}`;
    return this.http.put<Response>(ruta, project);
  }

  deleteProject(id: number): Observable<Response> {
    let ruta = `${this.API_URL}project/${id}`;
    return this.http.delete<Response>(ruta);
  }
}
