import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formErrors = '';
  public credentials = {
    empid: '',
    password: ''
  };
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private historyService: HistoryService
  ) {}
  ngOnInit() {}

  public onLoginSubmit(): void {
    this.formErrors = '';
    if (!this.credentials.empid || !this.credentials.password) {
      this.formErrors = 'All fields are required';
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    this.authService
      .login(this.credentials)
      .then(() =>
        this.router.navigateByUrl(this.historyService.getLastNonLoginUrl())
      )
      .catch(message => (this.formErrors = message));
  }
}
