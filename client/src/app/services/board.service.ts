import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataService } from './data.service';
import 'rxjs/add/operators/map';

export interface Task {
  title: string;
  content?: string;
  empid?: string;
  tags?: string[];
}

export interface Stage {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  title: string;
  stages: Stage[];
}

@Injectable()
export class BoardService {
  private apiBaseUrl = 'http://localhost:5000/api/v1';
  env = environment;
  // tslint:disable-next-line: variable-name
  private _tasks: Task[] = getTasks();

  constructor(private http: HttpClient, private dataService: DataService) {
    console.log('Task Service init');
  }

  getTasks(): Task[] {
    return;
  }

  private makeTaskApiCall();
}
