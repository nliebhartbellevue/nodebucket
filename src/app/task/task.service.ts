/**
 * Title: task/task.service.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Task } from './task.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<{ tasks: Task[] }>();
  private baseUrl = 'http://localhost:5000/api/v2/task';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getTasks() {
    this.http
      .get<{ message: string; tasks: any }>(`${this.baseUrl}`)
      .pipe(
        map(taskData => {
          return taskData.tasks.map(task => {
            return {
              title: task.title,
              content: task.content,
              status: task.status,
              assignedTo: task.assignedTo,
              createdBy: task.createdBy,
              lastModifiedBy: task.lastModifiedBy,
              id: task._id
            };
          });
        })
      )
      .subscribe(transformedTasks => {
        console.log(transformedTasks);
        this.tasks = transformedTasks;
        this.tasksUpdated.next({
          tasks: [...this.tasks]
        });
      });
  }

  getEmpTask(assigned: string) {
    this.http
      .get<{ message: string; tasks: any }>(
        `${this.baseUrl}/emptask/${assigned}`
      )
      .pipe(
        map(taskData => {
          return taskData.tasks.map(task => {
            return {
              id: task._id,
              title: task.title,
              content: task.content,
              status: task.status,
              assignedTo: task.assignedTo,
              createdBy: task.createdBy,
              lastModifiedBy: task.lastModifiedBy
            };
          });
        })
      )
      .subscribe(transformedTasks => {
        console.log(transformedTasks);
        this.tasks = transformedTasks;
        this.tasksUpdated.next({
          tasks: [...this.tasks]
        });
      });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  getTask(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      status: string;
      assignedTo: string;
      createdBy: string;
      lastModifiedBy: string;
    }>(`${this.baseUrl}/id`);
  }

  addTask(
    title: string,
    content: string,
    assignedTo: string,
    createdBy: string,
    status: string
  ) {
    const task: Task = {
      id: null,
      title: title,
      content: content,
      status: status,
      assignedTo: assignedTo,
      createdBy: this.authService.getEmpid()
    };
    this.http
      .post<{ message: string; taskId: string }>(`${this.baseUrl}`, task)
      .subscribe(responseData => {
        const id = responseData.taskId;
        task.id = id;
        this.tasks.push(task);
        this.tasksUpdated.next({
          tasks: [...this.tasks]
        });
        this.router.navigate(['/']);
      });
  }

  updateTask(
    id: string,
    title: string,
    content: string,
    status: string,
    assignedTo: string,
    creadtedBy: string,
    lastModifiedBy: string
  ) {
    const task: Task = {
      id: id,
      title: title,
      content: content,
      status: status,
      assignedTo: assignedTo,
      createdBy: creadtedBy,
      lastModifiedBy: lastModifiedBy
    };
    this.http.put(`${this.baseUrl}/id`, task).subscribe(response => {
      const updatedTasks = [...this.tasks];
      const oldTaskIndex = updatedTasks.findIndex(t => t.id === task.id);
      updatedTasks[oldTaskIndex] = task;
      this.tasks = updatedTasks;
      this.tasksUpdated.next({
        tasks: [...this.tasks]
      });
      this.router.navigate(['/']);
    });
  }

  updateTaskStatus(task: Task) {
    this.http
      .patch<{ message: string; task: Task }>(
        `${this.baseUrl}/` + task.id,
        task
      )
      .subscribe(taskData => {});
  }

  deleteTask(taskId: string) {
    this.http.delete(`${this.baseUrl}/taskId`).subscribe(() => {
      const updatedTasks = this.tasks.filter(task => task.id !== taskId);
      this.tasks = updatedTasks;
      this.tasksUpdated.next({
        tasks: [...this.tasks]
      });
      this.router.navigate(['/']);
    });
  }
}
