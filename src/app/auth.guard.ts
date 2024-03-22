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
    const token = localStorage.getItem('token');
    const view = localStorage.getItem('view');
    // console.log(state.url);
    // login page
    if (state.url === '/login') {
      if (token) {
        if (this.isValidToken(token)) {
          // console.log('Logged in');
          if (view) {
            this.router.navigate([`home/${view}`]);
          } else {
            this.router.navigate(['home/task-manager']);
          }
        }
        return false;
      } else {
        return true;
      }
    }

    // other pages
    if (token) {
      if (!this.isValidToken(token)) {
        console.log('Your session expired!');
        localStorage.clear();
        this.router.navigate(['login']);
        return false;
      }

      return true;
    } else {
      console.log('No token');
      this.router.navigate(['login']);
      return false;
    }
  }

  isValidToken(token: string): boolean {
    const mins = (Date.now() - Number(token)) / 60000;
    console.log(
      'Token=>',
      token,
      `Session duration = ${Math.floor(mins)} min (max 60 min)`
    );
    if (Math.floor(mins) > 60) {
      return false;
    } else {
      return true;
    }
  }
}
