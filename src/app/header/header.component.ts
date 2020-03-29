import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  empIsAuthenticated = false;
  empid: string;
  email: string;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.empIsAuthenticated = this.authService.getAuth();
    this.empid = this.authService.getEmpid();
    this.email = this.authService.getEmail();

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.empIsAuthenticated = isAuthenticated;
        this.email = this.authService.getEmail();
        this.empid = this.authService.getEmpid();
      });
  }

  onLogout() {
    this.authService.logout();
    this.empid = null;
    this.email = null;
  }

  ngOnDestroy() {}
}
