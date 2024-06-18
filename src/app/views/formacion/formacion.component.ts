import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormationService } from 'src/app/services/formation.service';
import { formationModel } from 'src/app/models/formation.model';
import { CourseService } from 'src/app/services/course.service';
import { courseModel } from 'src/app/models/course.model';
import { FormacionFormComponent } from 'src/app/components/formacion-form/formacion-form.component';
import { CourseFormComponent } from 'src/app/components/course-form/course-form.component';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.sass']
})
export class FormacionComponent {
  @ViewChild(FormacionFormComponent) formationForm!: FormacionFormComponent;
  @ViewChild(CourseFormComponent) courseForm!: CourseFormComponent;

  public formations: formationModel[];
  public formation!: formationModel;

  public courses: courseModel[];
  public course!: courseModel;
  
  validationFormation: boolean;
  validationCourse: boolean;
  idProfile: number;

  constructor ( private formationService: FormationService,
                private courseService: CourseService,
                private router: Router,
                private route: ActivatedRoute
  ) {
    this.formations = [];
    this.courses = [];

    this.validationFormation = false;
    this.validationCourse = false;
    this.idProfile = 0;

    // this.viewFormations();
    this.viewCourses();

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
      this.viewFormations(this.idProfile);
    });
  }

  returnExperience() {
    this.router.navigate(['dashboard/experiencia', this.idProfile]);
  }

  cleanFormation() {
    this.formationForm.createFormation();
    this.formation.id = 0;
    console.log('ID FORMACION: ', this.formation.id);
  }

  viewFormations(idProfile: number) {
    this.formationService.getFormations(idProfile).subscribe((data: any) => {
      this.formations = data.data;
      if(this.formations) {
        this.validationFormation = true;
      }
    })
  }

  viewFormation(id: number) {
    this.formationService.getFormation(this.idProfile, id).subscribe( (formation: formationModel) => {
      this.formation = formation;
      console.log('VIEW: ', formation)
    })
  }

  deleteFormation(id: number) {
    this.formationService.deleteFormation(this.idProfile, id).subscribe( (data: any) => {
      console.log(data);
      this.viewFormations(this.idProfile);
    })
  }

  cleanCourse() {
    this.courseForm.createCourse();
  }

  viewCourses() {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = data.data;
      if(this.courses) {
        this.validationCourse = true;
      }
    })
  }

  viewCourse(id: number) {
    this.courseService.getCourse(id).subscribe( (course: courseModel) => {
      this.course = course;
    })
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe((data: any) => {
      console.log(data);
      this.viewCourses();
    });
  }

}
