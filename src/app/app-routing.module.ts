/**
 * Title: app-routing.module
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { TaskListComponent } from './task/task-list/task-list.component';
import { EmployeeTaskComponent } from './task/employee-task/employee-task.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  {
    path: 'emptask/:empid',
    component: EmployeeTaskComponent,
    canActivate: [AuthGuard]
  },
  { path: 'create', component: TaskCreateComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:taskId',
    component: TaskCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
