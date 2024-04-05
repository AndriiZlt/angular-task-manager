import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface User {
  id: string;
  age: number;
  email: string;
  gender: string;

  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
  };
  city: string;
}

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsViewComponent implements OnInit {
  friends: User[] = [];
  inputValue: string = '';
  isLoading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    localStorage.setItem('lastUrl', 'home/friends-list');
    let friendsFromLocalStorage = localStorage.getItem('friends');
    if (
      friendsFromLocalStorage != '' &&
      friendsFromLocalStorage != null &&
      friendsFromLocalStorage != 'undefined'
    ) {
      this.friends = JSON.parse(friendsFromLocalStorage);
    }

    let friendsFilterFromLocalStorage =
      localStorage.getItem('friendsListFilter');
    if (
      friendsFilterFromLocalStorage != '' &&
      friendsFilterFromLocalStorage != null &&
      friendsFilterFromLocalStorage != 'undefined'
    ) {
      this.inputValue = friendsFilterFromLocalStorage;
    }
  }

  onRemoveFriend(userId: string) {
    let friendToRemove = this.friends.filter(
      (friend) => friend.id === userId
    )[0];
    this.friends.splice(
      this.friends.indexOf(
        this.friends.filter((friend) => friend.id === userId)[0]
      ),
      1
    );

    localStorage.setItem('friends', JSON.stringify(this.friends));
    this.resetPage();
  }

  onFilterChange(): void {
    localStorage.setItem('friendsListFilter', this.inputValue);
    // console.log('filter changed', this.inputValue);
  }

  clearFilter(): void {
    this.inputValue = '';
    localStorage.setItem('friendsListFilter', '');
  }

  resetPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
  }
}
