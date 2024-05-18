import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

enum AlpacaView {
  'trading' = 1,
  'assets' = 2,
  'chart' = 3,
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  activeView: AlpacaView = AlpacaView.trading;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onViewChange(event): void {
    console.log('Event:', event.target.id);
    this.activeView = event.target.id;
    switch (event.target.id) {
      case 'trading':
        this.activeView = AlpacaView.trading;
        this.router.navigate(['alpaca/trading']);
        break;
      case 'assets':
        this.activeView = AlpacaView.assets;
        this.router.navigate(['alpaca/assets']);
        break;
      case 'chart':
        this.activeView = AlpacaView.chart;
        this.router.navigate(['alpaca/chart']);
        break;
      default:
        this.router.navigate(['task-manager']);
    }
  }

  logout(): void {
    console.log('Loging out...');
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
