/**
 * Title: validators/unique-empid.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueEmpid implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control;

    return this.authService.empidAvailable(value).pipe(
      map(value => {
        if (value.available) {
          return null;
        }
      }),
      catchError(err => {
        if (err.error.empid) {
          return of({ nonUniqueEmpid: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
