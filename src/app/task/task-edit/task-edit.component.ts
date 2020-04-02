/**
 * Title: task/task-edit.component.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent {
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private dialogRef: MatDialogRef<TaskEditComponent>,
    private taskService: TaskService
  ) {
    this.formGroup = new FormGroup({
      title: new FormControl(task.title, {
        validators: [Validators.required]
      }),
      content: new FormControl(task.content),
      status: new FormControl(task.status),
      assignedTo: new FormControl(task.assignedTo)
    });
  }

  onSubmit(formGroup: FormGroup) {
    this.dialogRef.close(this.formGroup.value);
  }
}
