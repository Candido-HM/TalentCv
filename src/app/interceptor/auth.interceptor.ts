import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('user_token');
    if(token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}` 
      });
      const modRequest =  request.clone({headers});
      return next.handle(modRequest);
    }

    return next.handle(request);
  }
}
