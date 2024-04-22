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

    console.log(
      'LastUrl:',
      lastUrl,
      'token:',
      token ? true : false,
      'state.url:',
      state.url
    );
    // login & register pages
    if (state.url === '/login' || state.url === '/register') {
      if (token) {
        if (lastUrl) {
          if (lastUrl === 'login' || lastUrl === 'register') {
            this.router.navigate(['home/task-manager']);
          } else {
            this.router.navigate([`${lastUrl}`]);
          }
        } else {
          this.router.navigate([`home/task-manager`]);
        }
        console.log('Login Returning false');
        return false;
      } else {
        console.log('Login Returning true');
        return true;
      }
    }

    // other pages
    if (token) {
      // console.log('Token => ' + token);
      console.log('Other Returning true');
      return true;
    } else {
      console.log('Other Returning false (no token)and navigating to Login');
      this.router.navigate(['login']);
      return false;
    }
  }
}
