import { Component, Input, OnInit } from '@angular/core';
import { SidenavView } from '../../models/sidenav.model';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() option_1: string;
  @Input() option_1_link: string;
  @Input() option_1_id: string;

  @Input() option_2: string;
  @Input() option_2_link: string;
  @Input() option_2_id: string;

  @Input() option_3: string;
  @Input() option_3_link: string;
  @Input() option_3_id: string;

  activeView: SidenavView;

  constructor(private layoutService: LayoutService) {
    this.activeView = layoutService.getCurrentLayout().sidenavView;
    // console.log('active view', this.activeView);
  }

  ngOnInit(): void {
    this.layoutService.getUpdatedLayout().subscribe((update) => {
      this.activeView = update.sidenavView;
      // console.log('updated view', update.sidenavView);
    });
  }
}
