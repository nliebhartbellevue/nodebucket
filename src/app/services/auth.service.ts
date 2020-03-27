import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { Employee } from '../models/employee';
import { AuthResponse } from './authresponse';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private dataService: DataService
  ) {}

  public getToken(): string {
    return this.storage.getItem('nodebucket-token');
  }

  public saveToken(token: string): void {
    this.storage.setItem('nodebucket-token', token);
  }

  public login(employee: Employee): Promise<any> {
    return this.dataService
      .login(employee)
      .then((authResponse: AuthResponse) => this.saveToken(authResponse.token));
  }

  public register(employee: Employee): Promise<any> {
    return this.dataService
      .register(employee)
      .then((authResponse: AuthResponse) => this.saveToken(authResponse.token));
  }

  public logout(): void {
    this.storage.removeItem('nodebucket-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getCurrentEmployee(): Employee {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { empid, firstName, email } = JSON.parse(atob(token.split('.')[1]));
      return { empid, firstName, email } as Employee;
    }
  }
}
