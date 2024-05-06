import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { courseModel } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent implements OnChanges {
  @Input() dataCourse: any;
  formCourse!: FormGroup;

  constructor( private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {
    this.createCourse();
  }

  ngOnChanges() {
    this.getCourse();
  }

  campoNoValido(campo: string) {
    return this.formCourse.get(campo)?.invalid && this.formCourse.get(campo)?.touched;
  }

  getCourse() {
    this.formCourse.reset({
      course_name: this.dataCourse?.course_name,
      company_training: this.dataCourse?.company_training,
      status: this.dataCourse?.status,
      start_date: this.dataCourse?.start_date,
      finish_date: this.dataCourse?.finish_date
    })
    console.log(this.dataCourse?.company_training);
  }

  createCourse() {
    this.formCourse = this.formBuilder.group({
      course_name: ['', [Validators.required, Validators.minLength(5)]],
      company_training: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      finish_date: ['']
    })
  }

  save() {
    console.log(this.formCourse);

    const course: courseModel = this.formCourse.value;

    if(this.formCourse.invalid) {
      this.formCourse.markAllAsTouched();
    }

    if(this.dataCourse && this.dataCourse.id) {
      this.courseService.updateCourse(this.dataCourse.id, course).subscribe((res: any) => {
        console.log(res);
      });
      console.log('REGISTRO ACTUALIZADO');
    } else {
      this.courseService.saveCourse(course).subscribe((res: any) => {
        console.log(res);
      })
      console.log('REGISTRO GUARDADO')
    }
  }
}
