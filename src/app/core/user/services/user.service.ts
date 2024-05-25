import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends ApiService {
  apiName = 'User';
  v = 1;

  getUsers<User>(): Observable<User[]> {
    return this.get<User[]>('getusers');
  }

  getCurrentUser<User>(): Observable<User> {
    return this.get<User>('getuser');
  }
}
