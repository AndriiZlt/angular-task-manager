import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface User {
  id: string;
  cell: string;
  dob: {
    age: number;
    date: string;
  };
  email: string;
  gender: string;

  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  city: string;
  country: string;
}

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsViewComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  friends: User[] = [];
  inputValue: string = '';
  isLoading: boolean = true;
  ngOnInit(): void {
    let friendsFromLocalStorage = localStorage.getItem('friends');
    if (
      friendsFromLocalStorage != '' &&
      friendsFromLocalStorage != null &&
      friendsFromLocalStorage != 'undefined'
    ) {
      this.friends = JSON.parse(friendsFromLocalStorage);
      // console.log('Friends', this.friends);
    }

    let friendsFilterFromLocalStorage =
      localStorage.getItem('friendsListFilter');
    if (
      friendsFilterFromLocalStorage != '' &&
      friendsFilterFromLocalStorage != null &&
      friendsFilterFromLocalStorage != 'undefined'
    ) {
      this.inputValue = friendsFilterFromLocalStorage;
      // console.log('Friends', this.friends);
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

  onFilterChange() {
    localStorage.setItem('friendsListFilter', this.inputValue);
    // console.log('filter changed', this.inputValue);
  }

  clearFilter() {
    this.inputValue = '';
    localStorage.setItem('friendsListFilter', '');
  }

  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
  }
}
