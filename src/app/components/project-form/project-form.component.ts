import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CloseModalService } from 'src/app/services/complements/close-modal.service';
import { ProjectService } from 'src/app/services/project.service';
import { projectModel } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.sass']
})
export class ProjectFormComponent implements OnChanges {
  @Input() dataProject: any;
  @Output() loadingProjects = new EventEmitter;

  idProfile: number;
  formProject!: FormGroup;
  
  constructor(  private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private projectService: ProjectService,
                private closeModal: CloseModalService) {
    this.createProject();
    this.idProfile = 0;

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
    });
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
      return;
    }
    
    if( this.dataProject && this.dataProject.id != 0) {
      this.projectService.updateProject(this.idProfile, this.dataProject.id, project).subscribe((res: any) => {
        console.log(res);
        this.dataProject.id = null;
        this.loadingProjects.emit();
        this.closeModal.close('modalProject');
      });
    } else {
      this.projectService.saveProject(this.idProfile, project).subscribe( (res: any) => {
        console.log(res);
        this.loadingProjects.emit();
        this.closeModal.close('modalProject');
      });
    }
  }
}
