import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsRoutingModule } from './friends-routing.module';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { OnlineUsersComponent } from './components/online-users/online-users.component';
import { FriendsViewComponent } from './components/friends-view.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MaterialModule } from 'src/app/shared/modules/material-module';
import { FormsModule } from '@angular/forms';
import { FriendsPipe } from './pipes/friends.pipe';
import { FriendChartComponent } from '../tasks-app/components/chart/friend-chart/friend-chart.component';

@NgModule({
  declarations: [
    FriendsViewComponent,
    FriendCardComponent,
    OnlineUsersComponent,
    UserCardComponent,
    FriendsPipe,
    FriendChartComponent,
  ],
  imports: [CommonModule, FriendsRoutingModule, MaterialModule, FormsModule],
})
export class FriendsModule {}
