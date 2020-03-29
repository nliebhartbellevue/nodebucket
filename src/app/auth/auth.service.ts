/**
 * Title: auth/auth.service.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthModel } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimeout: any;
  private empid: string;
  private email: string;
  private authStatusListener = new Subject<boolean>();
  private baseUrl = 'http://localhost:5000/api/v2/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // get jwt token
  getToken() {
    return this.token;
  }
  // get auth status stream as an Observable
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  // get authentication status
  getAuth() {
    return this.isAuthenticated;
  }
  // get empid
  getEmpid() {
    return this.empid;
  }
  // get email
  getEmail() {
    return this.email;
  }

  // register a new employee
  register(
    empid: string,
    password: string,
    name: string,
    email: string,
    role: string,
    avatarPath: string,
    designation: string
  ) {
    const authModel: AuthModel = {
      empid: empid,
      password: password,
      name: name,
      email: email,
      role: role,
      avatarPath: avatarPath,
      designation: designation
    };
    this.http
      .post(`${this.baseUrl}/register`, authModel)
      .subscribe(response => {
        console.log(response);
      });
  }

  // log employee in with their employee id and password
  login(empid: string, password: string) {
    const authModel: AuthModel = { empid, password };
    this.http
      .post<{ token: string; expiresIn: number; empid: string }>(
        `${this.baseUrl}/login`,
        authModel
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.empid = response.empid;
          this.authStatusListener.next(true);
          const now = new Date();
          const expiration = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuth(token, expiration, this.empid);
          this.router.navigate(['/']);
        }
        console.log(response);
      });
  }

  // used to automatically authenticate employee if token is still avaliable in local strorage
  autoAuthenticate() {
    const authInfo = this.getAuthData();

    if (!authInfo) {
      return;
    }

    const now = new Date();
    const expiresIn = authInfo.expiration.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.empid = authInfo.empid;
      this.setTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // log employee out of the application
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimeout);
    this.clearAuth();
    this.empid = null;
    this.email = null;
    // TODO: chaekc if this reroute needs to be there
    this.router.navigate(['/']);
  }

  // set timer til token expires
  setTimer(duration: number) {
    console.log(`Timer strated: ${duration}`);
    this.tokenTimeout = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // save authentication data to local storage
  private saveAuth(token: string, expiration: Date, empid: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('empid', empid);
  }

  // clear local storage of all auth data
  private clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('empid');
  }

  // get auth data from local stroage
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const empid = localStorage.getItem('empid');

    if (!token || !expiration) {
      return;
    }

    return {
      token,
      expiration: new Date(expiration),
      empid
    };
  }
}
