import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class HubConnectionService {
  connection: signalR.HubConnection;
  message$?: Observable<string>;

  startConnection = async () => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7027/signal-hub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    await this.connection
      .start()
      .then(() => {
        console.log('Connection started');
        this.askServerListener();
      })
      .catch((err) => console.log('Error while strating connection:', err));
  };

  askServer(name: string) {
    this.connection.invoke('askServer', name).catch((e) => console.log(e));
    this.connection
      .invoke('sendNotification', name)
      .catch((e) => console.log(e));
  }

  askServerListener() {
    this.connection.on('send', (res) => {
      console.log('send:', res);
    });

    this.connection.on('askServerResponse', (res) => {
      console.log('askServerResponse', res);
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

  sendNotification(message: string) {
    this.connection
      .invoke('SendNotification', message)
      .catch((e) => console.log(e));
  }
}
