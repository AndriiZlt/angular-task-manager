import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private location: Location) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let token = localStorage.getItem('token');
    let lastUrl = localStorage.getItem('lastUrl');
    if (state.url === '/login' || state.url === '/register') {
      if (token) {
        if (lastUrl) {
          if (lastUrl === 'login' || lastUrl === 'register') {
            this.router.navigate(['task-manager']);
          } else {
            this.router.navigate([`${lastUrl}`]);
          }
        } else {
          this.router.navigate([`task-manager`]);
        }

        return false;
      } else {
        return true;
      }
    }
    // other pages
    if (token) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
