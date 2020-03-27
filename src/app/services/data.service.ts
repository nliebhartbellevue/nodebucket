/**
 * Title: services/data.service.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = 'http://localhost:5000/api/v1';
  env = environment;

  private handleError(error: any): Promise<any> {
    console.error('Something went wrong:', error);
    return Promise.reject(error.message || error);
  }

  public login(employee: Employee): Promise<AuthResponse> {
    return this.makeAuthApiCall(this.env.loginUrl, employee);
  }

  public register(employee: Employee): Promise<AuthResponse> {
    return this.makeAuthApiCall(this.env.registerUrl, employee);
  }

  private makeAuthApiCall(
    urlPath: string,
    employee: Employee
  ): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, employee)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }
}
