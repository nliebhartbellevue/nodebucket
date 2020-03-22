import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardService, Board } from '../services/board.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  boards: Board[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private boardService: BoardService
  ) {
    this.boards = boardService.getBoards();
  }

  get currentBoard() {
    return this.boardService.currentBoard;
  }

  activate(board: Board) {
    this.boardService.currentBoard = board;
  }

  ngOnInit() {}
}
