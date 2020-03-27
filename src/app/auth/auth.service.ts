/**
 * Title: auth/auth.service.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface EmpidAvailableResponse {
  available: boolean;
}

interface RegisterCredentials {
  empid: string;
  password: string;
  passwordConfirmation: string;
}

interface RegisterResponse {
  empid: string;
}

interface LoggedinResponse {
  authenticated: boolean;
  empid: string;
}

interface LoginCredentials {
  empid: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'http://localhost:5000/api/v1/auth';
  loggedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  // check if empid is available
  empidAvailable(empid: string) {
    return this.http.post<EmpidAvailableResponse>(`${this.rootUrl}/empid`, {
      empid
    });
  }

  // Register new employee
  register(credentials: RegisterCredentials) {
    return this.http
      .post<RegisterResponse>(`${this.rootUrl}/register`, credentials)
      .pipe(
        tap(() => {
          this.loggedin$.next(true);
        })
      );
  }

  // check authentication status
  checkAuth() {
    return this.http.get<LoggedinResponse>(`${this.rootUrl}`).pipe(
      tap(({ authenticated }) => {
        this.loggedin$.next(authenticated);
      })
    );
  }

  // logout
  logout() {
    return this.loggedin$.next(false);
  }

  // login
  login(credentials: LoginCredentials) {
    return this.http.post(`${this.rootUrl}/login`, credentials).pipe(
      tap(() => {
        this.loggedin$.next(true);
      })
    );
  }
}
