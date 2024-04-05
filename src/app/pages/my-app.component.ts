import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAppComponent implements OnInit {
  token: string;
  loginName: string;
  lastUrl: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getDataFromLocalStorage();

    if (this.lastUrl) {

      this.router.navigate([`${this.lastUrl}`]);
    } else {

      this.router.navigate([`home/task-manager`]);
    }

    this.apiService.getUsers().subscribe((data) => {
      console.log('Users from backend:', data);
    });

    this.loginService.getLoginData().subscribe((param: any) => {
      if (param !== undefined && param !== '' && param !== null) {
        this.loginName = param;
        localStorage.setItem('loginName', param);
      }
    });
  }

  getDataFromLocalStorage(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    } else {
      this.token = undefined;
    }

    let loginName = localStorage.getItem('loginName');
    if (loginName) {
      this.loginName = loginName;
    }

    let lastUrl = localStorage.getItem('lastUrl');
    if (lastUrl) {
      this.lastUrl = lastUrl;
    }
  }

  onViewChange(event): void {
    this.lastUrl = 'home/' + event.target.id;
    localStorage.setItem('lastUrl', this.lastUrl);
    switch (this.lastUrl) {
      case 'home/task-manager':
        this.router.navigate(['home/task-manager']);
        break;
      case 'home/friends-list':
        this.router.navigate(['home/friends-list']);
        break;
      default:
        this.router.navigate(['home/task-manager']);
    }
  }

  logout(): void {
    console.log('Loging out...');
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
