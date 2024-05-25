import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsViewComponent } from './components/friends-view.component';
import { OnlineUsersComponent } from './components/online-users/online-users.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsViewComponent,
  },
  {
    path: 'users',
    component: OnlineUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRoutingModule {}
