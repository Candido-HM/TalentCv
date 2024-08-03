import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormationService } from 'src/app/services/formation.service';
import { formationModel } from 'src/app/models/formation.model';
import { CourseService } from 'src/app/services/course.service';
import { courseModel } from 'src/app/models/course.model';
import { FormacionFormComponent } from 'src/app/components/formacion-form/formacion-form.component';
import { CourseFormComponent } from 'src/app/components/course-form/course-form.component';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

import { TemplatePdfService } from 'src/app/services/template-pdf.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.sass']
})
export class FormacionComponent {
  @ViewChild(FormacionFormComponent) formationForm!: FormacionFormComponent;
  @ViewChild(CourseFormComponent) courseForm!: CourseFormComponent;
  @ViewChild(ConfirmationComponent) modalClose!: ConfirmationComponent;


  public formations: formationModel[];
  public formation!: formationModel;

  public courses: courseModel[];
  public course!: courseModel;

  public modalName: string;
  public modalType: string;
  
  validationFormation: boolean;
  validationCourse: boolean;
  idProfile: number;
  idFormation: number = 0;
  idCurse: number = 0;

  constructor ( private formationService: FormationService,
                private courseService: CourseService,
                private router: Router,
                private route: ActivatedRoute,
                private pdfService: TemplatePdfService
  ) {
    this.formations = [];
    this.courses = [];

    this.validationFormation = false;
    this.validationCourse = false;
    this.idProfile = 0;
    this.modalName = '';
    this.modalType = '';

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
      this.viewFormations(this.idProfile);
      this.viewCourses(this.idProfile);
    });
  }

  returnExperience() {
    this.router.navigate(['experiencia', this.idProfile]);
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

  confirmationFormation(id: number, professional: string){
    this.modalType = 'formación';
    this.modalName = professional;
    this.idFormation = id;
  }

  deleteFormation(id: number) {
    this.formationService.deleteFormation(this.idProfile, id).subscribe( (data: any) => {
      console.log(data);
      this.viewFormations(this.idProfile);
      this.modalClose.closeModal();
    })
    console.log('FORMACION ELIMINADO CORRECTAMENTE');
  }

  cleanCourse() {
    this.courseForm.createCourse();
    this.course.id = 0;
    console.log('ID COURSE: ', this.formation.id);
  }

  viewCourses(idProfile: number) {
    this.courseService.getCourses(idProfile).subscribe((data: any) => {
      this.courses = data.data;
      if(this.courses) {
        this.validationCourse = true;
      }
    })
  }

  viewCourse(id: number) {
    this.courseService.getCourse(this.idProfile, id).subscribe( (course: courseModel) => {
      this.course = course;
    })
  }

  confirmationCurse(id: number, name: string){
    this.modalType = 'curso';
    this.modalName = name;
    this.idCurse = id;
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(this.idProfile, id).subscribe((data: any) => {
      console.log(data);
      this.viewCourses(this.idProfile);
      this.modalClose.closeModal();
    });
    console.log('CURSO ELIMINADO CORRECTAMENTE');
  }

  validationConfirmation(action: string) {
    console.log('ACTION:',action)
    if ( action === 'formación') {
      this.deleteFormation(this.idFormation);
    } else if ( action  === 'curso') {
      this.deleteCourse(this.idCurse);
    }
  }

  generatePDF(){
    this.pdfService.getTemplate(this.idProfile).subscribe( blob => {
      const ruta =  window.URL.createObjectURL(blob);
      window.open(ruta, '_blank');
    });
    // window.open(ruta, '_blank');
    console.log('¡CLICK!', this.idProfile)
  }

}
