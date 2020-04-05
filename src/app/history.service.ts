import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private urls: string[] = [];
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(routerEvent => routerEvent instanceof NavigationEnd))
      .subscribe((routerEvent: NavigationEnd) => {
        const url = routerEvent.urlAfterRedirects;
        this.urls = [...this.urls, url];
      });
  }
  public getPreviousUrl(): string {
    const length = this.urls.length;
    return length > 1 ? this.urls[length - 2] : '/';
  }
}
