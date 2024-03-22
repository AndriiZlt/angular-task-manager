import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../pages/friends-view/friends-view.component';

@Pipe({
  name: 'pipe2',
})
export class FriendsPipe implements PipeTransform {
  transform(allFriends: User[], filter: string): User[] {
    let filteredFriends: User[] = allFriends.filter((friend) =>
      friend.name.first.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredFriends;
  }
}
