import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // Change this to your file location

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  baseUrl: string;
  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.apiUrl = environment.apiUrl;
  }
}
