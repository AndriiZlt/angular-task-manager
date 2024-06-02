import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from '../models/Friend.model';
import { TaskApiService } from '../../tasks-app/services/task.service';
import { FriendsApiService } from '../services/friends.service';

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsViewComponent implements OnInit {
  friends: Friend[] = [];
  filteredFriends: Friend[] = [];
  inputValue: string = '';
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: FriendsApiService
  ) {}

  ngOnInit(): void {
    this.updateFriends();
    // this.updateFilterFromLC();
  }

  updateFriends(): void {
    let sub = this.apiService.getFriends().subscribe((res) => {
      this.friends = <Friend[]>res;
      this.filteredFriends = this.friends;
      localStorage.setItem('friends', JSON.stringify(this.friends));
      sub.unsubscribe();
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
    let sub = this.apiService
      .deleteFriend(Number(friendId))
      .subscribe((res) => {
        this.updateFriends();
        sub.unsubscribe();
      });
  }

  onFilterChange(): void {
    this.filteredFriends = this.friends.filter((f) => {
      if (
        f.fName.toLowerCase().includes(this.inputValue.toLowerCase()) ||
        f.lName.toLowerCase().includes(this.inputValue.toLowerCase())
      ) {
        return true;
      }
    });
    localStorage.setItem('friendsListFilter', this.inputValue);
  }

  clearFilter(): void {
    this.inputValue = '';
    localStorage.setItem('friendsListFilter', '');
    this.filteredFriends = this.friends;
  }

  resetPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
  }
}
