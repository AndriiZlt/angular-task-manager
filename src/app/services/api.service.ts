import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly rootURL = 'https://localhost:7027/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.rootURL + '/v1/User/getusers');
  }

  authentication() {}
}