import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HideNavbarService {

  private showNavbarSubject = new BehaviorSubject<boolean>(true);
  showNavbar$ = this.showNavbarSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Define routes where the navbar should not be displayed
      const noNavbarRoutes = ['/register'];
      const currentUrl = event.urlAfterRedirects;
      this.showNavbarSubject.next(!noNavbarRoutes.includes(currentUrl));
    });
  }
}
