import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { Observable } from 'rxjs';
import { JwtAuth } from '../models/jwtAuth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl = 'api/v2/Auth/register';
  loginUrl = 'api/v2/Auth/login';

  constructor(private http: HttpClient) {}

  public register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(
      'https://localhost:7027/' + this.registerUrl,
      user
    );
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(
      'https://localhost:7027/' + this.loginUrl,
      user
    );
  }
}
