import { Component, OnInit } from '@angular/core';
import { SidenavView } from '../../models/sidenav.model';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SidenavComponent implements OnInit {
  activeView: SidenavView = SidenavView.trading;

  constructor(private layoutService: LayoutService) {
    this.activeView = layoutService.getCurrentLayout().sidenavView;
  }

  ngOnInit(): void {
    this.layoutService.getUpdatedLayout().subscribe((update) => {
      this.activeView = update.sidenavView;
    });
  }
}
