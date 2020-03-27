/**
 * Title: auth/auth-http-interceptor.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add credentials to outgoing request
    const modifiedReq = req.clone({
      withCredentials: true
    });

    return next.handle(modifiedReq);
  }
}
