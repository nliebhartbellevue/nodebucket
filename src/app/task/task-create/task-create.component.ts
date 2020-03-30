import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../task.service';
import { AuthModel } from '../../auth/auth.model';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  task: Task;
  form: FormGroup;
  private mode = 'create';
  private taskId: string;
  private employees: AuthModel[] = [];

  constructor(
    public taskService: TaskService,
    public router: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      status: new FormControl('todo'),
      empid: new FormControl('')
    });
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.taskService.getTask(this.taskId).subscribe(taskData => {
          this.task = {
            id: taskData._id,
            title: taskData.title,
            content: taskData.content,
            status: taskData.status,
            assignedTo: taskData.assignedTo,
            createdBy: taskData.createdBy,
            lastModifiedBy: taskData.lastModifiedBy
          };
          this.form.setValue({
            title: this.task.title,
            content: this.task.content,
            status: this.task.status,
            empid: this.task.assignedTo
          });
        });
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });
  }

  onSaveTask() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.taskService.addTask(
        this.form.value.title,
        this.form.value.content,
        this.form.value.assignedTo,
        this.form.value.createdBy,
        this.form.value.status
      );
    } else {
      this.taskService.updateTask(
        this.taskId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.status,
        this.form.value.assignedTo,
        this.form.value.createdBy,
        this.form.value.lastModifiedBy
      );
    }

    this.form.reset();
  }
}
