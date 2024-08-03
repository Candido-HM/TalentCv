import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CloseModalService } from 'src/app/services/complements/close-modal.service';
import { CourseService } from 'src/app/services/course.service';
import { courseModel } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent implements OnChanges {
  @Input() dataCourse: any;
  @Output() loadingCourses = new EventEmitter();

  formCourse!: FormGroup;
  idProfile: number;

  constructor( private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private closeModal: CloseModalService
  ) {
    this.createCourse();
    this.idProfile = 0;

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
    });
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
      return;
    }

    if(this.dataCourse && this.dataCourse.id != 0) {
      this.courseService.updateCourse(this.idProfile, this.dataCourse.id, course).subscribe((res: any) => {
        console.log(res);
        this.dataCourse.id = null;
        this.loadingCourses.emit();
        this.closeModal.close('modalCourse');
      });
    } else {
      this.courseService.saveCourse(this.idProfile, course).subscribe((res: any) => {
        console.log(res);
        this.loadingCourses.emit();
        this.closeModal.close('modalCourse');
      })
    }
  }
}
