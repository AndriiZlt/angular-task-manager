import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsViewComponent } from './components/friends-view.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: FriendsViewComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRoutingModule {}
