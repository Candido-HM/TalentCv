import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplatePdfService {

  private API_URL: string = environment.apiURL;

  private templateId: number;

  constructor( private http: HttpClient) { 
    this.templateId =  0;
  }

  getTemplates() {
    let ruta = `${this.API_URL}templates`;
    return this.http.get(ruta);
  }

  getTemplate(id: number): Observable<Blob> {
    return this.http.get(`${this.API_URL}viewPDF/${id}`, { responseType: 'blob'});
  }

  setTemplateId(id: number) {
    this.templateId = id;
  }

  gettemplateId(): number {
    return this.templateId;
  }


}
