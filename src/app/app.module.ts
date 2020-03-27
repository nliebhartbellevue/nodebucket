import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Design
import { MaterialModule } from './material.module';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
// Services & Guards

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
