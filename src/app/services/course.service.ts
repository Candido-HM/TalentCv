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

  getCourses(): Observable<courseModel[]> {
    let ruta = `${this.API_URL}course`;
    return this.http.get<courseModel[]>(ruta);
  }

  saveCourse(course: courseModel): Observable<Response> {
    let ruta = `${this.API_URL}course`;
    return this.http.post<Response>(ruta, course);
  }

  getCourse(id: number): Observable<courseModel> { 
    let ruta = `${this.API_URL}course/${id}`;
    return this.http.get<courseModel>(ruta).pipe(
      map((resp: any) => {
        return new courseModel(resp.data);
      })
    )
  } 

  updateCourse(id: number, course: courseModel): Observable<Response> {
    let ruta = `${this.API_URL}course/${id}`;
    return this.http.put<Response>(ruta, course);
   }

  deleteCourse(id: number): Observable<Response> { 
    let ruta = `${this.API_URL}course/${id}`;
    return this.http.delete<Response>(ruta);
  }

}