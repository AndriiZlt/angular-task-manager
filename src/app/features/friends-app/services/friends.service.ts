import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FriendToAdd } from '../models/FriendToAdd.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendsApiService {
  constructor(private http: HttpClient) {}

  addFriend(friendToAdd: FriendToAdd) {
    return this.http.post(
      environment.apiUrl + `api/v1/Friend/addfriend`,
      friendToAdd
    );
  }

  getFriends() {
    return this.http.get(environment.apiUrl + 'api/v1/Friend/getfriends');
  }

  deleteFriend(friendId: number) {
    return this.http.delete(
      environment.apiUrl + `api/v1/Friend/deletefriend?friendId=${friendId}`
    );
  }
}
