import { Injectable } from '@angular/core';
import { FriendToAdd } from '../models/FriendToAdd.model';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Friend } from '../models/Friend.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsApiService extends ApiService {
  apiName = 'Friend';
  v = 1;

  addFriend(friendToAdd: FriendToAdd): Observable<Friend> {
    return this.post<Friend>(`addfriend`, friendToAdd);
  }

  getFriends(): Observable<Friend[]> {
    return this.get<Friend[]>('getfriends');
  }

  deleteFriend(friendId: number): Observable<Friend> {
    return this.delete<Friend>(`deletefriend?friendId=${friendId}`);
  }
}
