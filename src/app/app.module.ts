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
import { KendoModule } from './kendo.module';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskComponent } from './task/task.component';
import { DrawerComponent } from './drawer/drawer.component';
import { AboutComponent } from './about/about.component';
import { CardComponent } from './card/card.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskDeleteComponent } from './task/task-delete/task-delete.component';
import { ErrorComponent } from './error/error.component';
// Services
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    TaskComponent,
    ErrorComponent,
    AboutComponent,
    DrawerComponent,
    CardComponent,
    TaskEditComponent,
    TaskDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    KendoModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
