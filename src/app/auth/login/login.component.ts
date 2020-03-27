import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm = new FormGroup({
    empid: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.login(this.authForm.value).subscribe({
      next: () => {},
      error: ({ error }) => {
        if (error.empid || error.password) {
          this.authForm.setErrors({ credentials: true });
        }
      }
    });
  }
}
