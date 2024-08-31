import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SitiowebService {

  private API_URL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  // getSiteWeb(){
  //   console.log('Registro mostrado');
  //   //Esta informacion ya se muestra ya que desde el backend se desarrollo el controlador para mostrar toda infromacion
  // }

  createSiteWeb(url: string): Observable<Response> {
    let ruta = `${this.API_URL}link`;
    return this.http.post<Response>(ruta, url);
    // console.log('Registro guardado');
  }

  updateSiteWeb(id: number, sitio: any): Observable<Response> {
    let ruta = `${this.API_URL}link/${id}`
    return this.http.put<Response>(ruta, sitio);
    // console.log('Registro actualizado');
  }

  deleteSiteWeb() {
    console.log('Registro eliminado');
  }
}
