/**
 * Title: auth/register/register.component.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loading = false;
  public readonly roles = ['Admin', 'Manager', 'User'];
  public roleValue = 'User';

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.loading = true;
    console.log(form);
    this.authService.register(
      form.value.empid,
      form.value.email,
      form.value.password,
      form.value.name,
      form.value.role,
      form.value.avatarPath,
      form.value.designation
    );
  }
}
