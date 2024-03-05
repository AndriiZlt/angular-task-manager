import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../pages/friends-view/friends-view.component';

@Pipe({
  name: 'pipe2',
})
export class FilterFriendsPipe implements PipeTransform {
  transform(allFriends: User[], filter: string) {
    let filteredFriends: User[] = allFriends.filter((friend) =>
      friend.name.first.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredFriends;
  }
}
