import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { getMatIconNameNotFoundError } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  empIsAuthenticated = false;
  empid: string;
  email: string;
  role: string;
  name: string;

  loading$ = this.router.events.pipe(
    filter(
      event =>
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError ||
        event instanceof NavigationStart
    ),
    map(event => (event instanceof NavigationStart ? true : false))
  );
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.empIsAuthenticated = this.authService.getAuth();
    this.empid = this.authService.getEmpid();
    this.email = this.authService.getEmail();
    this.role = this.authService.getRole();
    this.name = this.authService.getName();

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.empIsAuthenticated = isAuthenticated;
        this.email = this.authService.getEmail();
        this.empid = this.authService.getEmpid();
        this.role = this.authService.getRole();
        this.name = this.authService.getName();
      });
  }

  logout() {
    this.authService.logout();
    this.empid = null;
    this.email = null;
    this.role = null;
    this.name = null;
    this.router.navigate(['/login']);
  }
}
