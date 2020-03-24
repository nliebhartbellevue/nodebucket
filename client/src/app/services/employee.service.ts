/**
 * Title: services/employee.service.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  // base employee url
  private usersUrl = 'http://localhost:5000/api/v1/employees';

  // get all employees
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(catchError(error));
  }
}
