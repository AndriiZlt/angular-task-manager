import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../friends-view.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  friends: User[] = [];
  users: User[] = [];
  isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    localStorage.setItem('lastUrl', 'friends-list/users');
    let friendsFromLocalStorage = localStorage.getItem('friends');
    if (
      friendsFromLocalStorage != '' &&
      friendsFromLocalStorage != null &&
      friendsFromLocalStorage != 'undefined'
    ) {
      let c: User[] = [...this.friends];
      c = JSON.parse(friendsFromLocalStorage);
      this.friends = c;
    }
  }

  onAddFriend(userId: string): void {
    let newUser: User;

    if (!this.friends.filter((friend) => friend.id === userId)[0]) {
      newUser = this.users.filter((user) => user.id === userId)[0];

      this.friends.push(newUser);
      alert(`User ${newUser.name} was added to your friend list!`);
      localStorage.setItem('friends', JSON.stringify(this.friends));
    } else {
      alert(`User is already in your friend list!`);
    }

    // console.log(this.friends);
  }

  fetchUsers(): void {
    let c: User[] = [];
    fetch(`https://dummyjson.com/users`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        // console.log(typeof data.users[0].age);
        data.users.map(
          ({
            email,
            gender,
            id,
            firstName,
            lastName,
            image,
            address: { city },
            age,
          }) =>
            c.push({
              id,
              age,
              email,
              gender,
              name: { first: firstName, last: lastName },
              picture: { large: image, medium: image },
              city,
            })
        );
        this.users = [...c];
        this.isLoading = false;
      })
      .catch((e) => console.log('Error:', e));
  }
}
