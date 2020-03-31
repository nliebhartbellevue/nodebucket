/**
 * Title: task/task-edit.component.ts
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.formGroup = formBuilder.group({
      _id: [task._id],
      title: [task.title, Validators.required],
      content: [task.content],
      status: [task.status],
      assignedTo: [task.assignedTo]
    });
  }

  onSubmit(formGroup: FormGroup) {
    const task: Task = {
      _id: this.formGroup.value._id,
      title: this.formGroup.value.title,
      content: this.formGroup.value.content,
      status: this.formGroup.value.status,
      assignedTo: this.formGroup.value.assignedTo
    };

    this.taskService.updateTask(task);
    this.dialogRef.close();
  }
}
