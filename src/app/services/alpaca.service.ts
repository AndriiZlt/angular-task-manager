import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlpacaService {
  headers = new HttpHeaders({
    'APCA-API-KEY-ID': 'AKQMYK77LB4OAAYYJWVI',
    'APCA-API-SECRET-KEY': 'PVyopT7FMZ4KAAaNuummqWWbE7h9a0myLtVORpQB',
  });
  dataURL = 'https://data.alpaca.markets';
  apiURL = 'https://api.alpaca.markets';

  constructor(private http: HttpClient) {}

  getAssetData(selectedStock) {
    console.log('Fetch data for :', selectedStock);
    return this.http.get(
      `${this.dataURL}/v2/stocks/${selectedStock}/bars?timeframe=1Day&start=2024-04-01&end=2024-05-04&limit=1000&feed=sip&sort=asc`,
      { headers: this.headers }
    );
  }

  getAccount() {
    return this.http.get(`${this.apiURL}/v2/account`, {
      headers: this.headers,
    });
  }

  getPositions(account_id: string) {
    return this.http.get(
      `https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/:${account_id}/positions`,
      {
        headers: this.headers,
      }
    );
  }
}
