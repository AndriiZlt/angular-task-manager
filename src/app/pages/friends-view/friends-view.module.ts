import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsListRoutingModule } from './friends-view-routing.module';
import { FriendCardComponent } from './friend-card/friend-card.component';
import { UsersComponent } from './people/users.component';
import { FriendsViewComponent } from './friends-view.component';
import { UserCardComponent } from './user-card/user-card.component';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule } from '@angular/forms';
import { FriendsPipe } from 'src/app/pipes/friends.pipe';

@NgModule({
  declarations: [
    FriendsViewComponent,
    FriendCardComponent,
    UsersComponent,
    UserCardComponent,
    FriendsPipe,
  ],
  imports: [
    CommonModule,
    FriendsListRoutingModule,
    MaterialModule,
    FormsModule,
  ],
})
export class FriendsViewModule {}
