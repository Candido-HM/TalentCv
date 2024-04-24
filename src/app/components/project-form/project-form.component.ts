import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { projectModel } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass']
})
export class ProjectFormComponent implements OnChanges {
  @Input() dataProject: any;
  formProject!: FormGroup;
  
  constructor( private formBuilder: FormBuilder,
                private projectService: ProjectService) {
    this.createProject();
    }

  ngOnChanges(): void {
    this.getProject();
  }
  
  campoNoValido(campo: string) {
    return this.formProject.get(campo)?.invalid && this.formProject.get(campo)?.touched;
  }

  createProject() {
    this.formProject = this.formBuilder.group({
      project_name: ['', [Validators.required, Validators.minLength(5)]],
      status: ['' , [Validators.required]],
      start_date: ['', [Validators.required]],
      finish_date: [''],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  getProject() {
    this.formProject.reset({
      project_name: this.dataProject?.project_name,
      status: this.dataProject?.status,
      start_date: this.dataProject?.start_date,
      finish_date: this.dataProject?.finish_date,
      description: this.dataProject?.description
    });
  }

  save() {
    console.log(this.formProject);
    const project: projectModel = this.formProject.value;
    if(this.formProject.invalid) {
      this.formProject.markAllAsTouched();
    }
    console.log('PROJECT ID: ', this.dataProject?.id);
    if( this.dataProject && this.dataProject.id) {
      this.projectService.updateProject( this.dataProject.id, project).subscribe((res: any) => {
        console.log(res);
      });
      console.log('FUNCIO UPDATE');
    } else {
      this.projectService.saveProject(project).subscribe( (res: any) => {
        console.log(res);
      });
      console.log('FUNCION CREAR PROJECT');
    }
  }
}
