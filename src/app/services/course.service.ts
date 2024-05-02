import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  saveCourse() { }

  getCourse() { /**por ID */}

  updateCourse() { }

  deleteCourse() { }

}
