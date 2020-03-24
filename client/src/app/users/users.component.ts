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
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { EmitterService } from '../services/emitter.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  defaultPhoto =
    'https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/user-512.png';
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

  constructor(public employeeService: EmployeeService) {}

  mouseover(firstName) {
    this.selectedName = firstName;
    document.getElementById('popup').style.display = 'block';
  }

  mouseleave() {
    document.getElementById('popup').style.display = 'none';
  }

  getAllUsers() {
    this.employeeService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getAllUsers();
  }

  public close() {
    this.opened = false;
  }

  public openPopup() {
    this.opened = true;
  }

  // add new employee
  addNewEmployee() {
    const data = {
      id: this.users.length + 1,
      empid: this.empid,
      firstName: this.firstName,
      lastName: this.lastName,
      photo: this.defaultPhoto,
      designation: this.designation
    };

    // holds a ref of comment
    let usersOperation: Observable<User[]>;
    usersOperation = this.employeeService.addUser(data);

    // subscribe to observable
    usersOperation.subscribe(
      users => {
        // emit list event
        this.users.push(data);
        this.empid = '';
        this.firstName = '';
        this.lastName = '';
        this.designation = '';
        this.opened = false;
        this.emitter.emit('Broadcase!');
      },
      err => {
        console.log(err);
      }
    );
  }

  openShortProfile(contributor) {
    this.openedShortProfile = true;
    this.selectedUserFirstName = contributor.firstName;
    this.selectedUserLastName = contributor.lastName;
    this.selectedUserEmpid = contributor.empid;
    this.selectedUserPhoto = contributor.photo;
    this.selectedUserDesignation = contributor.designation;
  }

  public closeShortProfile(status) {
    console.log(`Dialog result: ${status}`);
    this.openedShortProfile = false;
  }
}
