/**
 * Title: app.component.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { TaskService } from './task/task.service';
import { Task } from './task/task.model';
import { TaskEditComponent } from './task/task-edit/task-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  task: Task;
  todo: Task[] = [];
  progress: Task[] = [];
  complete: Task[] = [];
  isAdmin = false;
  isManager = false;
  empid: string;
  role: string;
  public tasksSub: Subscription;
  public authSub: Subscription;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.autoAuthenticate();
    this.checkAuth();
    this.getRole();
    this.empid = this.authService.getEmpid();
    this.taskService.getTasks();
    this.tasksSub = this.taskService
      .getTaskUpdateListener()
      .subscribe(response => {
        this.todo = response.tasks.filter(x => x.status === 'todo');
        this.progress = response.tasks.filter(x => x.status === 'progress');
        this.complete = response.tasks.filter(x => x.status === 'complete');
      });

    this.authSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.empid = this.authService.getEmpid();
      });
  }
  getRole() {
    this.role = localStorage.getItem('role');
  }
  authorized() {
    return this.role === 'admin' || this.role === 'manager';
  }

  checkAuth() {
    this.isAuthenticated = this.authService.getAuth();
  }

  get board() {
    return this.taskService.currentBoard;
  }

  editTask(task: Task) {
    this.dialog
      .open(TaskEditComponent, { width: '500px', data: task })
      .afterClosed()
      .subscribe(
        response => {
          if (response) {
            console.log(response);
            this.taskService.updateTask(response);
          } else {
            console.log('No Response');
          }
        },
        err => {
          console.log('Error' + err);
        }
      );
  }
  drop(event: CdkDragDrop<string[]>) {
    const task: Task = {
      _id: event.item.element.nativeElement.getAttribute('id'),
      title: null,
      content: null,
      status: event.container.element.nativeElement.id,
      assignedTo: null,
      createdBy: null,
      lastModifiedBy: null
    };

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.taskService.updateTaskStatus(task);
    }
  }

  onDelete(taskId: string) {
    this.taskService.deleteTask(taskId);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
