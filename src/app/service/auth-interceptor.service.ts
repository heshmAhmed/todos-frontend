import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private lStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.lStorageService.getCurrentUser()) {
      return next.handle(
        req.clone({
          headers: new HttpHeaders({
            Authorization: this.lStorageService.getCurrentUser().token,
          }),
        })
      );
    }
    return next.handle(req);
  }
}
