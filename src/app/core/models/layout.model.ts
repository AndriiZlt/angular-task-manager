import { SidenavView } from './sidenav.model';
import { HeaderView } from './view.model';

export interface Layout {
  showHeader: boolean;
  showSidenav: boolean;
  headerView: HeaderView;
  sidenavView: SidenavView;
}
