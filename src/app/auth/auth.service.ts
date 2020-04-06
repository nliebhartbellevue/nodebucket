/**
 * Title: auth/auth.service.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthModel } from './auth.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimeout: any;
  private empid: string;
  private email: string;
  private role: string;
  private name: string;
  private employees: AuthModel[] = [];
  private authStatusListener = new Subject<boolean>();
  private employeesUpdated = new Subject<{ employees: AuthModel[] }>();
  private baseUrl = 'api/v2';

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
  // get role
  getRole() {
    return this.role;
  }
  // get name
  getName() {
    return this.name;
  }

  getEmployees() {
    this.http
      .get<{ message: string; employees: AuthModel[] }>(
        `${this.baseUrl}/employee`
      )
      .pipe(
        map(empData => {
          return empData.employees.map(employee => {
            return {
              empid: employee.empid,
              name: employee.name,
              email: employee.email,
              role: employee.role,
              avatarPath: employee.avatarPath,
              designation: employee.designation
            };
          });
        })
      )
      .subscribe(transformedEmployees => {
        console.log(transformedEmployees);
        this.employees = transformedEmployees;
        this.employeesUpdated.next({
          employees: [...this.employees]
        });
      });
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
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
      empid,
      password,
      name,
      email,
      role,
      avatarPath,
      designation
    };
    this.http
      .post(`${this.baseUrl}/auth/register`, authModel)
      .subscribe(response => {
        this.employees.push(authModel);
        this.employeesUpdated.next({
          employees: [...this.employees]
        });
        this.router.navigate(['/']);
      });
  }

  // log employee in with their employee id and password
  login(empid: string, password: string) {
    const authModel: AuthModel = { empid, password };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        empid: string;
        role: string;
        name: string;
      }>(`${this.baseUrl}/auth/login`, authModel)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.empid = response.empid;
          this.role = response.role;
          this.name = response.name;
          this.authStatusListener.next(true);
          const now = new Date();
          const expiration = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuth(token, expiration, this.empid, this.role, this.name);
        }
        this.router.navigate(['/task']);
        console.log(response);
      });
  }

  // used to automatically authenticate employee if token is still available in local storage
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
      this.role = authInfo.role;
      this.name = authInfo.name;
      this.setTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // log employee out of the application
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
    clearTimeout(this.tokenTimeout);
    this.clearAuth();
    this.empid = null;
    this.email = null;
    this.role = null;
    this.name = null;
  }

  // set timer til token expires
  setTimer(duration: number) {
    console.log(`Timer strated: ${duration}`);
    this.tokenTimeout = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // save authentication data to local storage
  private saveAuth(
    token: string,
    expiration: Date,
    empid: string,
    role: string,
    name: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('empid', empid);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
  }

  // clear local storage of all auth data
  private clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('empid');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
  }

  // get auth data from local stroage
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const empid = localStorage.getItem('empid');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');

    if (!token || !expiration) {
      return;
    }

    return {
      token,
      expiration: new Date(expiration),
      empid,
      role,
      name
    };
  }
}
