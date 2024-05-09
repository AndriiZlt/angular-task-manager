import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetToBuy } from '../models/AssetToBuy.model';

@Injectable({
  providedIn: 'root',
})
export class AlpacaService {
  headers = new HttpHeaders({
    'APCA-API-KEY-ID': 'PKMHDN2E925RQH73D2PN',
    'APCA-API-SECRET-KEY': 'EWnXp2W2zq3dFtfLtO6lYVssSU1YzroK08fkS2IF',
  });

  authHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Basic Q0tMMVAyQkE4TVRNUkhSWDBCT1I6MmVIRWJxamkyakRmdmxuZkMwU25DWTJobFRKWVhwVEowRFJLREQ0Sg==',
  });

  dataURL = 'https://data.alpaca.markets'; //MARKET DATA API
  brokerApiUrl = 'https://broker-api.sandbox.alpaca.markets'; //BROKER API
  tradingApiUrl = 'https://paper-api.alpaca.markets'; //TRADING API

  constructor(private http: HttpClient) {}

  getPositions() {
    return this.http.get(`${this.tradingApiUrl}/v2/positions`, {
      headers: this.headers,
    });
  }

  getActivity() {
    return this.http.get(`${this.tradingApiUrl}/v2/account/activities`, {
      headers: this.headers,
    });
  }

  getAssetData(selectedStock) {
    return this.http.get(
      `${this.dataURL}/v2/stocks/${selectedStock}/bars?timeframe=1Day&start=2024-04-01&end=2024-05-07&limit=1000&feed=sip&sort=asc`,
      { headers: this.headers }
    );
  }

  getAccount() {
    return this.http.get(`${this.tradingApiUrl}/v2/account`, {
      headers: this.headers,
    });
  }

  getOrders() {
    return this.http.get(`${this.tradingApiUrl}/v2/orders`, {
      headers: this.headers,
    });
  }

  createOrder(body) {
    return this.http.post(`${this.tradingApiUrl}/v2/orders`, body, {
      headers: this.headers,
    });
  }

  getAsset() {
    return this.http.get(
      `https://paper-api.sandbox.alpaca.markets/v2/assets/GOOGL`,
      {
        headers: this.headers,
      }
    );
  }

  getAssets(headers: HttpHeaders) {
    return this.http.get(`${this.brokerApiUrl}/v1/assets`, {
      headers: headers,
    });
  }

  getLastTrades(symbol: string) {
    return this.http.get(`${this.dataURL}/v2/stocks/${symbol}/trades/latest`, {
      headers: this.headers,
    });
  }

  getLastBar(symbol: string) {
    return this.http.get(`${this.dataURL}/v2/stocks/${symbol}/bars/latest`, {
      headers: this.headers,
    });
  }
}
