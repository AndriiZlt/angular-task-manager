// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  apiName: string;

  constructor(private http: HttpClient) {}

  get<ResponseType>(
    url: string,
    options?: any
  ): Observable<HttpEvent<ResponseType>> {
    return this.http.get<ResponseType>(
      `${environment.apiUrl}/v1/${this.apiName}/${url}`,
      options
    );
  }

  post<ResponseType>(
    url: string,
    body: any,
    options: any
  ): Observable<HttpEvent<ResponseType>> {
    return this.http.post<ResponseType>(
      `${environment.apiUrl}/v1/${this.apiName}/${url}`,
      body,
      options
    );
  }

handleError(){
  
}
}
