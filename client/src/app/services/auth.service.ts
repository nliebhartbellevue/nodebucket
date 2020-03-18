import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  config = environment;
  private employee = new BehaviorSubject<boolean>(false);
  cast = this.employee.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentEmployee');

    /**
     * Check for token,
     * if token return true,
     * else return false
     */
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  registerEmployee(employee) {
    return this.http.post<any>(`${this.config.registerUrl}`, employee);
  }

  loginEmployee(employee) {
    return this.http.post<any>(`${this.config.loginUrl}`,
      { empid: employee.empid, password: employee.password })
      // tslint:disable-next-line: no-shadowed-variable
      .pipe(map(employee => {
        // login successful if there's a jwt token in response
        if (employee && employee.token) {
          // store employee details and jwt token in local storage
          localStorage.setItem('currentEmployee', JSON.stringify('JWT ' + employee.token));
        }
        this.employee.next(true);
        return employee;
      }));
  }

  logoutEmployee() {
    // remove employee from local strorage
    localStorage.removeItem('currentEmployee');
    this.employee.next(false);
    this.router.navigate(['/home']);
  }

}
