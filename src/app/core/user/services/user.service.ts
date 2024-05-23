import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../features/friends-app/components/friends-view.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + 'api/v1/User/getusers');
  }

  getCurrentUser() {
    return this.http.get(environment.apiUrl + 'api/v1/User/getuser');
  }
}
