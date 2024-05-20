import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginNameService } from '../../auth/services/loginName.service';
import { HubConnectionService } from '../../services/hub-connection.service';
import { TaskManagerApiService } from 'src/app/features/tasks-app/services/task.service';
import { UserTM } from '../../user/models/UserTM.model';
import { LayoutService } from '../../services/layout.service';
import { HeaderView } from '../../models/view.model';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  token: string;
  loginName: string;
  lastUrl: string;
  signalRStatus: string = '';
  userId: number;
  currentUser: UserTM;
  headerView: HeaderView = HeaderView.task;

  constructor(
    private router: Router,
    private loginNameService: LoginNameService,
    private signalrService: HubConnectionService,
    private apiService: TaskManagerApiService,
    private layoutService: LayoutService,
    private urlService: UrlService
  ) {
    this.lastUrl = urlService.getLastUrl();
    this.headerView = this.layoutService.getCurrentLayout().headerView;
    this.layoutService.getUpdatedLayout().subscribe((viewChange) => {
      console.log('View change', viewChange);
      this.headerView = viewChange.headerView;
    });
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
      this.router.navigate([`task-manager`]);
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
    console.log('event in header', event.target.id);
    switch (event.target.id) {
      case 'task':
        // this.currentView.current = 'task';
        // this.lastUrl = 'task-manager';
        this.router.navigate(['task-manager']);
        break;
      case 'friends':
        // this.currentView.current = 'friends';
        // this.lastUrl = 'friends-list';
        this.router.navigate(['friends-list']);
        break;
      case 'alpaca':
        // this.currentView.current = 'alpaca';
        // let lastUrl = localStorage.getItem('lastUrl');
        this.lastUrl = this.urlService.getLastUrl();
        if (this.lastUrl.includes('alpaca')) {
          this.router.navigate([this.lastUrl]);
        } else {
          this.router.navigate(['alpaca/trading']);
        }
        break;
      default:
        // this.currentView.current = 'task';
        // this.lastUrl = 'task-manager';
        this.router.navigate(['task-manager']);
    }
  }

  logout(): void {
    console.log('Loging out...');
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
