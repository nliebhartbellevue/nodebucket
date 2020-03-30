/**
 * Title: app-routing.module
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { TaskComponent } from './task/task.component';
import { EmployeeTaskComponent } from './task/employee-task/employee-task.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
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
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
