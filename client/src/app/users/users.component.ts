/**
 * Title: users/users.component.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { EmitterService } from '../services/emitter.service';
import { EmployeeService } from '../services/employee.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  errorMessage;
  public opened = false;
  public empid: string;
  public firstName: string;
  public lastName: string;
  public designation: string;
  public selectedName: string;

  emitter = EmitterService.get('UsersChannel');

  public openedShortProfile = false;
  public selectedUserEmpid: string;
  public selectedUserFirstName: string;
  public selectedUserLastName: string;
  public selectedUserPhoto: string;
  public selectedUserDesignation: string;

  constructor(
    public employeeService: EmployeeService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  mouseover(firstName) {
    this.selectedName = firstName;
    document.getElementById('popup').style.display = 'block';
  }

  mouseleave() {
    document.getElementById('popup').style.display = 'none';
  }

  getAllUsers() {
    this.employeeService.getUser().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}
}
