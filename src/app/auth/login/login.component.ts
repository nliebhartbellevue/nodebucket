import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.empid, form.value.password);
  }
}
