import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAppComponent implements OnInit {
  view: string = 'task-manager';
  token: string;
  loginName: string;
  lastUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.loginService.getLoginData().subscribe((param: any) => {
      if (param !== undefined && param !== '' && param !== null) {
        this.loginName = param;
        localStorage.setItem('loginName', param);
      }
    });
  }

  ngOnInit(): void {
    this.getDataFromLocalStorage();
    console.log(`home/${this.lastUrl}`);
    this.router.navigate([`home/${this.lastUrl}`]);
  }

  getDataFromLocalStorage(): void {
    let viewFromLocalStorage = localStorage.getItem('view');
    if (
      viewFromLocalStorage !== '' &&
      viewFromLocalStorage !== null &&
      viewFromLocalStorage !== 'undefined'
    ) {
      this.view = viewFromLocalStorage;
    }

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
    this.view = event.target.id;
    localStorage.setItem('view', this.view);
    switch (this.view) {
      case 'task-manager':
        this.router.navigate(['home/task-manager']);
        localStorage.setItem('lastUrl', 'home/task-manager');
        break;
      case 'friends-list':
        this.router.navigate(['home/friends-list']);
        localStorage.setItem('lastUrl', 'home/friends-list');
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
