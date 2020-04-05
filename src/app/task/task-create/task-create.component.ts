import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthModel } from '../../auth/auth.model';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { AuthService } from '../../auth/auth.service';
import { EmitterService } from '../emitter.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, OnDestroy {
  emitter = EmitterService.get('EmployeesChannel');
  employees: AuthModel[] = [];
  tasks: Task[] = [];
  empid: string;
  title: string;
  content: string;
  status = 'todo';
  assignedTo: string;
  createdBy: string;
  public employeeSub = Subscription;
  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.getEmpid();
    this.authService.getEmployees();
    // @ts-ignore
    this.employeeSub = this.authService.getEmployeeUpdateListener()
      .subscribe(res => {
        this.employees = res.employees;
      });
  }
  getEmpid() {
    this.empid = localStorage.getItem('empid');
  }

  addTask(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.taskService.addTask(
        form.value.title,
        form.value.content,
        form.value.assignedTo,
        this.empid,
       'todo'
      );
      form.reset();
      this.taskService.getTasks();
  }

  ngOnDestroy() {
    // @ts-ignore
    this.employeeSub.unsubscribe();
  }
}
