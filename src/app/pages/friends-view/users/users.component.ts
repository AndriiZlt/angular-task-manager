import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../friends-view.component';
import { Router } from '@angular/router';
import { Friend } from 'src/app/models/Friend.model';
import { FriendToAdd } from 'src/app/models/FriendToAdd.model';
import { TaskManagerApiService } from 'src/app/services/task-managerApi.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  friends: Friend[] = [];
  users: User[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private apiService: TaskManagerApiService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('lastUrl', 'home/friends-list/users');
    this.fetchUsers();
    this.updateFriendsFromLC();
  }

  gender(userGender: string): 'unknown' | 'male' | 'female' | 'other' {
    switch (userGender) {
      case 'male':
        return 'male';
      case 'female':
        return 'female';
      case 'other':
        return 'other';
      default:
        return 'unknown';
    }
  }

  updateFriendsFromLC() {
    let friendsFromLC = JSON.parse(localStorage.getItem('friends'));
    if (friendsFromLC) {
      this.friends = [...(<Friend[]>friendsFromLC)];
    }
  }

  onAddFriend(userId: string): void {
    let newFriend: User;
    let usersEmail = this.users.filter((u) => u.id === userId)[0].email;
    console.log('email', usersEmail);
    console.log(
      'Common users',
      this.friends.filter((friend) => friend.email === usersEmail)
    );
    if (!this.friends.filter((friend) => friend.email === usersEmail)[0]) {
      newFriend = this.users.filter((user) => user.id === userId)[0];
      let friendToAdd: FriendToAdd = {
        age: Number(newFriend.age),
        email: newFriend.email,
        gender: this.gender(newFriend.gender),
        fName: newFriend.name.first,
        lName: newFriend.name.last,
        picture: newFriend.picture.large,
      };

      // console.log('FriendToAdd', friendToAdd);

      this.apiService.addFriend(friendToAdd).subscribe((data) => {
        console.log('Response:', data);
        if (data) {
          alert(
            `User ${friendToAdd.fName} ${friendToAdd.lName} was added to your friend list!`
          );
          this.updateFriends(<Friend>data);
        }
      });
    } else {
      alert(`User is already in your friend list!`);
    }
  }

  updateFriends(friendToAdd: Friend): void {
    this.friends.push(friendToAdd);
    let friendsFromLC: Friend[] = JSON.parse(localStorage.getItem('friends'));
    if (friendsFromLC) {
      friendsFromLC.push(friendToAdd);
      localStorage.setItem('friends', JSON.stringify(friendsFromLC));
    }
  }

  back(): void {
    this.router.navigate([`home/friends-list`]);
  }

  fetchUsers(): void {
    let c: User[] = [];
    fetch(`https://dummyjson.com/users`)
      .then((result) => {
        return result.json();
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
        console.log('Users online:', this.users);
        this.isLoading = false;
      })
      .catch((e) => console.log('Error:', e));
  }
}
