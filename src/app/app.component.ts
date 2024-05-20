import { Component } from '@angular/core';
import { UrlService } from './core/services/url.service';
import { LayoutService } from './core/services/layout.service';
import { Layout } from './core/models/layout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  layout: Layout;

  constructor(
    private urlService: UrlService,
    private layoutService: LayoutService
  ) {
    urlService.setToLocalStorage();
    urlService.navigateToLast();
    this.layout = layoutService.getCurrentLayout();
    layoutService.getUpdatedLayout().subscribe((update: Layout) => {
      this.layout.showHeader = update.showHeader;
      this.layout.showSidenav = update.showSidenav;
    });
  }

  ngOnInit(): void {}
}
