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

export interface Step {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  steps: Step[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<{ tasks: Task[] }>();
  private baseUrl = 'http://localhost:5000/api/v2/task';
  private boards$: Board[] = require('../../data.json');
  currentBoard = this.boards$[0];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getBoards(): Board[] {
    return this.boards$;
  }

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
              _id: task._id
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
              _id: task._id,
              title: task.title,
              content: task.content,
              status: task.status,
              assignedTo: task.assignedTo,
              createdBy: task.createdBy
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
    }>(`${this.baseUrl}/_id`);
  }

  addTask(
    title: string,
    content: string,
    assignedTo: string,
    createdBy: string,
    status: string
  ) {
    const task: Task = {
      _id: null,
      title,
      content,
      status,
      assignedTo,
      createdBy: this.authService.getEmpid()
    };
    this.http
      .post<{ message: string; taskId: string }>(`${this.baseUrl}`, task)
      .subscribe(responseData => {
        // tslint:disable-next-line:variable-name
        const _id = responseData.taskId;
        task._id = _id;
        this.tasks.push(task);
        this.tasksUpdated.next({
          tasks: [...this.tasks]
        });
        this.router.navigate(['/']);
      });
  }

  updateTask(task: Task) {
    console.log(task._id);
    this.http.put(`${this.baseUrl}/` + task._id, task).subscribe(
      response => {
        if (response) {
          console.log(response);
          const updatedTasks = [...this.tasks];
          const oldTaskIndex = updatedTasks.findIndex(t => t._id === task._id);
          updatedTasks[oldTaskIndex] = task;
          this.tasks = updatedTasks;
          this.tasksUpdated.next({
            tasks: [...this.tasks]
          });
          this.router.navigate(['/']);
        } else {
          console.log('Problem with response');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateTaskStatus(task: Task) {
    this.http
      .patch<{ message: string; task: Task }>(
        `${this.baseUrl}/task.id`,

        task
      )
      .subscribe(taskData => {});
    console.log(task._id);
  }
  _;

  deleteTask(taskId: string) {
    this.http.delete(`${this.baseUrl}/taskId`).subscribe(() => {
      const updatedTasks = this.tasks.filter(task => task._id !== taskId);
      this.tasks = updatedTasks;
      this.tasksUpdated.next({
        tasks: [...this.tasks]
      });
      this.router.navigate(['/']);
    });
  }
}
