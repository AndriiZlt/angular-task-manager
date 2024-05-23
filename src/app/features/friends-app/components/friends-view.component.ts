import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from '../models/Friend.model';
import { TaskApiService } from '../../tasks-app/services/task.service';
import { FriendsApiService } from '../services/friends.service';

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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsViewComponent implements OnInit {
  friends: Friend[] = [];
  inputValue: string = '';
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: FriendsApiService
  ) {}

  ngOnInit(): void {
    this.updateFriends();
    this.updateFilterFromLC();
  }

  updateFriends(): void {
    this.apiService.getFriends().subscribe((res) => {
      this.friends = [...(<Friend[]>res)];
      console.log('Friends:', this.friends);
      localStorage.setItem('friends', JSON.stringify(this.friends));
    });
  }

  updateFilterFromLC(): void {
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

  onRemoveFriend(friendId: string): void {
    this.apiService.deleteFriend(Number(friendId)).subscribe((res) => {
      this.updateFriends();
    });
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
