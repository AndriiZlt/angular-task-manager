import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignalrClient, SignalrConnection } from 'ngx-signalr-websocket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class HubConnectionService {
  connection: signalR.HubConnection;
  message$?: Observable<string>;

  startConnection = () => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7027/chat-hub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.connection
      .start()
      .then(() => {
        console.log('Connection started');
      })
      .catch((err) => console.log('Error while strating connection:', err));
  };

  askServer(name: string) {
    this.connection.invoke('askServer', name).catch((e) => console.log(e));
  }

  askServerListener() {
    this.connection.on('askServerResponse', (response) => {
      this.message$ = response;
      console.log('Response from signalR:', response);
    });
  }

  //   constructor(httpClient: HttpClient) {
  //     const client = SignalrClient.create(httpClient);
  //     client
  //       .connect('https://localhost:7027/chat-hub')
  //       .subscribe((connection) => (this.connection = connection));
  //   }

  //   register(name: string) {
  //     // let response = 'initial';

  //     this.connection?.send('OnLoginAsync', name);

  //     this.message$ = this.connection
  //       .on<[string]>('Logged')
  //       .pipe(map(([name]) => name));
  //     console.log('message in HUB:', this.message$);
  //   }
}
