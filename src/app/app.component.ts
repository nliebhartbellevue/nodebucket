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
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { TaskService, Step } from './task/task.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  todo: Task[] = [];
  progress: Task[] = [];
  complete: Task[] = [];
  empid: string;
  stepTodo;
  public tasksSub: Subscription;
  public authSub: Subscription;

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.authService.autoAuthenticate();
    this.checkAuth();
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

  checkAuth() {
    this.isAuthenticated = this.authService.getAuth();
  }

  get board() {
    return this.taskService.currentBoard;
  }

  drop(event: CdkDragDrop<string[]>) {
    const task: Task = {
      id: event.item.element.nativeElement.getAttribute('id'),
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
