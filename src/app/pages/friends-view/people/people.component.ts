import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../friends-view.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit {
  constructor() {}
  friends: User[] = [];
  users: User[] = [];
  ngOnInit(): void {
    let friendsFromLocalStorage = localStorage.getItem('friends');
    if (
      friendsFromLocalStorage != '' &&
      friendsFromLocalStorage != null &&
      friendsFromLocalStorage != 'undefined'
    ) {
      let c: User[] = [...this.friends];
      c = JSON.parse(friendsFromLocalStorage);
      this.friends = c;
      console.log('Friends', this.friends);
    }
    this.fetchUsers();
  }

  onAddFriend(userId: string) {
    console.log(userId);
    let newUser: User;

    if (!this.friends.filter((friend) => friend.id === userId)[0]) {
      newUser = this.users.filter((user) => user.id === userId)[0];

      this.friends.push(newUser);
      alert(
        `User ${newUser.name.first} ${newUser.name.last} was added to your friend list!`
      );
      localStorage.setItem('friends', JSON.stringify(this.friends));
    } else {
      alert(`User is already in your friend list!`);
    }

    // console.log(this.friends);
  }

  fetchUsers() {
    let c: User[] = [];
    fetch(`https://randomuser.me/api/?results=45`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        // console.log(data.results);
        data.results.map(
          ({
            cell,
            dob,
            email,
            gender,
            id: { value },
            name,
            picture,
            location: { city, country },
            login: { uuid },
          }) =>
            c.push({
              id: uuid,
              cell,
              dob,
              email,
              gender,
              name,
              picture,
              city,
              country,
            })
        );
        console.log('C', c);
        this.users = [...c];
        console.log('fetched users ', this.users);
      });
  }
}
