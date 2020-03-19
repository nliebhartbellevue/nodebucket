import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, ReplaySubject, throwError, timer } from 'rxjs';
import {
  catchError,
  mergeMap,
  retryWhen,
  switchMap,
  tap,
  flatMap
} from 'rxjs/operators';
import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private principalCache$: ReplaySubject<Employee> = new ReplaySubject(1);

  constructor(private http: HttpClient) {}

  login(empid: string, password: string): Observable<Employee | undefined> {
    const loginRequest = `empid=${encodeURIComponent(
      empid
    )}&password=${encodeURIComponent(password)}`;
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.post(environment.loginUrl, loginRequest, { headers }).pipe(
      retryWhen(this.retryOnceOnCsrFailure()),
      switchMap(() => this.fetchEmployeeInfo())
    );
  }

  retryOnceOnCsrFailure = () => (attempts: Observable<any>) => {
    return attempts.pipe(
      mergeMap((error, i) => {
        const attempt = i + 1;
        if (attempt > 1 || error.status !== 403) {
          return throwError(error);
        }
        return timer(1);
      })
    );
    // tslint:disable-next-line: semicolon
  };

  logout(): Observable<any> {
    return this.get(environment.logoutUrl, {}).pipe(
      tap(() => {
        this.principalCache$.next(undefined);
      })
    );
  }

  private handleUnauthenticatedEmployee(): Observable<undefined> {
    this.principalCache$.next(undefined);
    return of(undefined);
  }

  private fetchEmployeeInfo(): Observable<Employee | undefined> {
    return this.http.get<Employee>(environment.profileUrl).pipe(
      tap(employee => this.principalCache$.next(employee)),
      catchError(() => this.handleUnauthenticatedEmployee())
    );
  }
}
