import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/AssetToBuy.model';
import { Observable } from 'rxjs';
import { Asset } from '../models/Asset.model';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlpacaService extends ApiService {
  headers = new HttpHeaders({
    'APCA-API-KEY-ID': environment.API_KEY_ID,
    'APCA-API-SECRET-KEY': environment.API_SECRET_KEY,
  });

  apiName = 'Alpaca';
  v = 1;

  getAssets(): Observable<Asset[]> {
    return this.get<Asset[]>(`assets`, {
      headers: this.headers,
    });
  }

  getAssetById(asset_id: string): Observable<Asset> {
    return this.get<any>(`asset/${asset_id}`, {
      headers: this.headers,
    });
  }

  getPositions(): Observable<any[]> {
    return this.get<any>(`positions`, {
      headers: this.headers,
    });
  }

  getActivity(): Observable<any> {
    return this.get<any>(`transactions`, {
      headers: this.headers,
    });
  }

  getAssetData(symbol: string): Observable<any> {
    return this.get<any>(`bars/${symbol}`, {
      headers: this.headers,
    });
  }

  getAccount(): Observable<any> {
    return this.get<any>(`account`, {
      headers: this.headers,
    });
  }

  getOrders(): Observable<any> {
    return this.get<any[]>(`orders`, {
      headers: this.headers,
    });
  }

  createOrder(order: Order): Observable<any> {
    return this.post<any>(`order`, order, {
      headers: this.headers,
    });
  }

  closePosition(asset_id: string): Observable<any> {
    return this.delete<any>(`position/${asset_id}`, {
      headers: this.headers,
    });
  }

  closeOrder(order_id: string): Observable<any> {
    return this.delete<any>(`orders/${order_id}`, {
      headers: this.headers,
    });
  }

  getLastTrades(symbol: string): Observable<any[]> {
    return this.get<any[]>(`stocks/${symbol}/trades/latest`, {
      headers: this.headers,
    });
  }

  getLastBar(symbol: string): Observable<any> {
    return this.get<any>(`stocks/${symbol}/bars/latest`, {
      headers: this.headers,
    });
  }
}
