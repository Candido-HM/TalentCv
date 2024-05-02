import { Component } from '@angular/core';
import { FormationService } from 'src/app/services/formation.service';
import { formationModel } from 'src/app/models/formation.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.sass']
})
export class FormacionComponent {
  public formations: formationModel[];
  public formation!: formationModel;
  
  validationFormation: boolean;

  constructor ( private formationService: FormationService) {
    this.formations = [];

    this.validationFormation = false;

    this.viewFormations();
  }

  viewFormations() {
    this.formationService.getFormations().subscribe((data: any) => {
      this.formations = data.data;
      if(this.formations) {
        this.validationFormation = true;
      }
    })
  }

  viewFormation(id: number) {
    this.formationService.getFormation(id).subscribe( (formation: formationModel) => {
      this.formation = formation;
      console.log('VIEW: ', formation)
    })
  }

  deleteFormation(id: number) {
    this.formationService.deleteFormation(id).subscribe( (data: any) => {
      console.log(data);
    })
  }

}
