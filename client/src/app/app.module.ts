import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material Design
import { MaterialModule } from './material.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
// Services
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DrawerComponent } from './drawer/drawer.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      HomeComponent,
      RegisterComponent,
      LoginComponent,
      DrawerComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      MaterialModule
   ],
   providers: [
      provide
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
