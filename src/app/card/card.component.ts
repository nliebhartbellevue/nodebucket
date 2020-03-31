import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() assignedTo: string;
  @Input() createdBy: string;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
