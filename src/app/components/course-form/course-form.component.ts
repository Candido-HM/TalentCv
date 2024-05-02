import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { courseModel } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent {

  formCourse!: FormGroup;

  constructor( private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {
    this.createCourse();
  }

  campoNoValido(campo: string) {
    return this.formCourse.get(campo)?.invalid && this.formCourse.get(campo)?.touched;
  }

  createCourse() {
    this.formCourse = this.formBuilder.group({
      course_name: ['', [Validators.required, Validators.minLength(5)]],
      company_training: ['', Validators.required, Validators.minLength(5)],
      status: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      finish_date: ['']
    })
  }

  save() {
    console.log(this.formCourse);

    if(this.formCourse.invalid) {
      this.formCourse.markAllAsTouched();
    }
  }
}
