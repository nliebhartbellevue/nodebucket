import { Component, OnInit } from '@angular/core';
import { AuthModel } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';
import { EmitterService } from '../task/emitter.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: AuthModel[] = [];
  public opened = false;
  public empid: string;
  private password: string;
  public name: string;
  public role: string;
  public designation: string;
  public avatarPath: string;
  public selectedName: string;
  emitter = EmitterService.get('EmployeesChannel');
  public openedShortProfile = false;
  public selectedEmployeeName: string;
  public selectedEmployeeAvatar: string;
  public selectedEmployeeDesignation: string;
  public employeeSub: Subscription;
  public openModal: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  mouseover(name) {
    this.selectedName = name;
    document.getElementById('popup').style.display = 'block';
  }
  mouseleave() {
    document.getElementById('popup').style.display = 'none';
  }
  ngOnInit() {
    this.authService.getEmployees();
    this.employeeSub = this.authService.getEmployeeUpdateListener()
      .subscribe(res => {
        this.employees = res.employees;
    });
  }
  public close() {
    this.opened = false;
  }
  public openPopup() {
    this.opened = true;
  }
  addNewEmployee(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.register(
      form.value.empid,
      form.value.password,
      form.value.name,
      form.value.email,
      form.value.role,
      form.value.avatarPath,
      form.value.designation
    );
    form.reset();
  }
  openShortProfile(contributor) {
    this.openedShortProfile = true;
    this.selectedEmployeeName = contributor.name;
    this.selectedEmployeeAvatar = contributor.avatarPath;
    this.selectedEmployeeDesignation = contributor.designation;
  }
  public closeShortProfile(status) {
    console.log(`Dialog result: ${status}`);
    this.openedShortProfile = false;
  }
}
