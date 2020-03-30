/**
 * Title: task/task-list/task-list.component.ts
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
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  todo: Task[] = [];
  inProgress: Task[] = [];
  complete: Task[] = [];
  isAuthenticated = false;
  empid: string;
  private tasksSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.empid = this.authService.getEmpid();
    this.taskService.getTasks();
    this.tasksSub = this.taskService
      .getTaskUpdateListener()
      .subscribe(response => {
        this.todo = response.tasks.filter(x => x.status === 'todo');
        this.inProgress = response.tasks.filter(x => x.status === 'progress');
        this.complete = response.tasks.filter(x => x.status === 'complete');
      });
    this.isAuthenticated = this.authService.getAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.empid = this.authService.getEmpid();
      });
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
    this.authStatusSub.unsubscribe();
  }
}
