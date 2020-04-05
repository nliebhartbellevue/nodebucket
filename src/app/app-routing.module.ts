/**
 * Title: app-routing.module
 * Author: Nathaniel Liebhart
 * Description: NodeBucket
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './auth/login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
