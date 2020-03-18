import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    data: { animation: 'HomePage' }
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), BrowserAnimationsModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
