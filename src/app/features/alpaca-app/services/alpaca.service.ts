import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/AssetToBuy.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlpacaService {
  headers = new HttpHeaders({
    'APCA-API-KEY-ID': 'PKMHDN2E925RQH73D2PN',
    'APCA-API-SECRET-KEY': 'EWnXp2W2zq3dFtfLtO6lYVssSU1YzroK08fkS2IF',
  });

  dataURL = 'https://data.alpaca.markets'; //MARKET DATA API
  brokerApiUrl = 'https://broker-api.sandbox.alpaca.markets'; //BROKER API
  tradingApiUrl = 'https://paper-api.alpaca.markets'; //TRADING API

  constructor(private http: HttpClient) {}

  getAssets() {
    return this.http.get(environment.apiUrl + `api/v1/Alpaca/assets`, {
      headers: this.headers,
    });
  }

  getAssetById(asset_id: string) {
    return this.http.get(
      environment.apiUrl + `api/v1/Alpaca/asset/${asset_id}`,
      {
        headers: this.headers,
      }
    );
  }

  getPositions() {
    return this.http.get(environment.apiUrl + `api/v1/Alpaca/positions`, {
      headers: this.headers,
    });
  }

  getActivity() {
    return this.http.get(environment.apiUrl + `api/v1/Alpaca/transactions`, {
      headers: this.headers,
    });
  }

  getAssetData(symbol: string) {
    return this.http.get(environment.apiUrl + `api/v1/Alpaca/bars/${symbol}`, {
      headers: this.headers,
    });
  }

  getAccount() {
    return this.http.get(environment.apiUrl + `api/v1/Alpaca/account`, {
      headers: this.headers,
    });
  }

  getOrders() {
    return this.http.get(environment.apiUrl + `api/v1/Alpaca/orders`, {
      headers: this.headers,
    });
  }

  createOrder(order: Order) {
    return this.http.post(environment.apiUrl + `api/v1/Alpaca/order`, order, {
      headers: this.headers,
    });
  }

  closePosition(asset_id: string) {
    return this.http.delete(
      environment.apiUrl + `api/v1/Alpaca/position/${asset_id}`,
      {
        headers: this.headers,
      }
    );
  }

  closeOrder(order_id: string) {
    return this.http.delete(`${this.tradingApiUrl}/v2/orders/${order_id}`, {
      headers: this.headers,
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
