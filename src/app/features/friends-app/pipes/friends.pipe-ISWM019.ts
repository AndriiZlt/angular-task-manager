import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from 'src/app/core/models/Friend.model';

@Pipe({
  name: 'pipe2',
})
export class FriendsPipe implements PipeTransform {
  transform(allFriends: Friend[], filter: string): Friend[] {
    let filteredFriends: Friend[] = allFriends.filter((friend) =>
      friend.fName.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredFriends;
  }
}
