/**
 * Title: app.module.ts
 * Author: Nathaniel Liebahrt
 * Description: NodeBucket
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Material Design
import { MaterialModule } from './material.module';
// Kendo UI
import { SharedModule } from './shared.module';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { TaskComponent } from './task/task.component';
import { DrawerComponent } from './drawer/drawer.component';
import { AboutComponent } from './about/about.component';
import { CardComponent } from './card/card.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { EmployeesComponent } from './employees/employees.component';
import { ErrorComponent } from './error/error.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
// Services
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { EmitterService } from './task/emitter.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    TaskComponent,
    ErrorComponent,
    AboutComponent,
    DrawerComponent,
    CardComponent,
    TaskEditComponent,
    EmployeesComponent,
    TaskCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    DragDropModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    EmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
