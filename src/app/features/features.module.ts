import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksModule } from './tasks-app/tasks.module';
import { FriendsModule } from './friends-app/friends.module';
import { AlpacaModule } from './alpaca-app/alpaca.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AlpacaModule, TasksModule, FriendsModule],
})
export class FeaturesModule {}
