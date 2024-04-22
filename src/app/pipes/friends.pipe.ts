import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from '../models/Friend';

@Pipe({
  name: 'pipe2',
})
export class FriendsPipe implements PipeTransform {
  transform(allFriends: Friend[], filter: string): Friend[] {
    let filteredFriends: Friend[] = allFriends.filter((friend) =>
      friend.fName.toLowerCase().includes(filter.toLowerCase())
    );
    // .concat(
    //   allFriends.filter((friend) =>
    //     friend.lName.toLowerCase().includes(filter.toLowerCase())
    //   )
    // );

    return filteredFriends;
  }
}
