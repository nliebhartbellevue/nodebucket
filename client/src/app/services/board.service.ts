import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

export interface Task {
  test: string;
  assignedTo?: Employee;
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

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private _boards: Board[] = boardAPICall();

  currentBoard = this._boards[0];

  getBoards(): Board[] {
    return this._boards;
  }
}
