import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginNameService } from '../../services/loginName.service';
import { HubConnectionService } from '../../services/hub-connection.service';
import { TaskManagerApiService } from '../../services/API.service';
import { UserTM } from '../../models/UserTM.model';

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAppComponent implements OnInit, OnDestroy {
  token: string;
  loginName: string;
  lastUrl: string;
  signalRStatus: string = '';
  userId: number;
  currentUser: UserTM;

  constructor(
    private router: Router,
    private loginNameService: LoginNameService,
    private signalrService: HubConnectionService,
    private apiService: TaskManagerApiService
  ) {
    //
    this.signalrService.getData().subscribe((param: any) => {
      this.signalRStatus = param.text;

      this.apiService.getCurrentUser().subscribe((res) => {
        // console.log('Current User=>', res);
        if (res) {
          this.currentUser = <UserTM>res;
          this.signalrService.saveId(this.currentUser.id);
        }
      });
    });
  }

  ngOnInit(): void {
    this.signalrService.startConnection();
    this.getDataFromLocalStorage();

    if (this.lastUrl) {
      this.router.navigate([`${this.lastUrl}`]);
    } else {
      this.router.navigate([`home/task-manager`]);
    }

    this.loginNameService.getLoginData().subscribe((param: any) => {
      if (param !== undefined && param !== '' && param !== null) {
        this.loginName = param;
        localStorage.setItem('loginName', param);
      }
    });
  }

  ngOnDestroy() {
    this.signalrService.connection.off('askServerResponse');
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
    if (event.target.innerHTML === 'Alpaca-App') {
      this.router.navigate(['/alpaca/transactions']);
      return;
    }
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
