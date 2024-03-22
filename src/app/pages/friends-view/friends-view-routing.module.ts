import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsViewComponent } from './friends-view.component';
import { UsersComponent } from './people/users.component';

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
export class FriendsListRoutingModule {}
