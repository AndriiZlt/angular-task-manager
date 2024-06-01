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
    if (state.url === '/auth/login' || state.url === '/auth/register') {
      if (token) {
        if (lastUrl) {
          if (lastUrl === 'auth/login' || lastUrl === 'auth/register') {
            this.router.navigate(['task']);
          } else {
            this.router.navigate([`${lastUrl}`]);
          }
        } else {
          this.router.navigate([`task`]);
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
      console.log('Unauthorized');
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
