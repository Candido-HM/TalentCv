import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { courseModel } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private API_URL: string = environment.apiURL;

  constructor( private http: HttpClient ) { }

  getCourses(idProfile: number): Observable<courseModel[]> {
    let ruta = `${this.API_URL}${idProfile}/course`;
    return this.http.get<courseModel[]>(ruta);
  }

  saveCourse(idProfile: number, course: courseModel): Observable<Response> {
    let ruta = `${this.API_URL}${idProfile}/course`;
    return this.http.post<Response>(ruta, course);
  }

  getCourse(idProfile: number, id: number): Observable<courseModel> { 
    let ruta = `${this.API_URL}${idProfile}/course/${id}`;
    return this.http.get<courseModel>(ruta).pipe(
      map((resp: any) => {
        return new courseModel(resp.data);
      })
    )
  } 

  updateCourse(idProfile: number, id: number, course: courseModel): Observable<Response> {
    let ruta = `${this.API_URL}${idProfile}/course/${id}`;
    return this.http.put<Response>(ruta, course);
   }

  deleteCourse(idProfile: number, id: number): Observable<Response> { 
    let ruta = `${this.API_URL}${idProfile}/course/${id}`;
    return this.http.delete<Response>(ruta);
  }

}
