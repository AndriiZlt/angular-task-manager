import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  showHeader: boolean = false;
  showNavbar: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        localStorage.setItem('lastUrl', val.url);
        if (val.url == '/auth/login' || val.url == '/auth/register') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
        if (
          val.url == '/alpaca/trading' ||
          val.url == '/alpaca/assets' ||
          val.url == '/alpaca/chart' ||
          val.url == '/alpaca'
        ) {
          this.showNavbar = true;
        } else {
          this.showNavbar = false;
        }
      }
    });
  }

  ngOnInit(): void {}
}
