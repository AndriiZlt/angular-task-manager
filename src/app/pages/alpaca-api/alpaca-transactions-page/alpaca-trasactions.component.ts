import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlpacaService } from 'src/app/services/alpaca.service';
import * as asset_storage from '../assets';
import * as nasdaq100 from '../nasdaq100';
import { AssetToBuy } from 'src/app/models/AssetToBuy.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './alpaca-transactions.component.html',
  styleUrls: ['./alpaca-transactions.component.scss'],
})
export class AlpacaTradingComponent implements OnInit {
  mainUserId: string = 'd986b6ed-afda-464b-afb7-07e6fa9d7227';
  clientId: string = 'd6a7ad49-7d27-47f8-99de-b87f61b6b024';
  orders: any[] = [];
  activities: any[] = [];
  assets: any[] = [];
  nasdaq100: string[];
  filteredAssets: string[];
  selectedAsset = new Object();
  selectedPrice: number;
  quantity: number = 1;
  inputValue: string;
  myControl = new FormControl();
  buttonDisabled: boolean = true;
  inputDisabled: boolean = true;

  constructor(private alpacaService: AlpacaService) {
    this.nasdaq100 = nasdaq100.get();
  }

  ngOnInit(): void {
    this.updatePage();

    this.alpacaService.getAssets().subscribe((data) => {
      console.log('data', data);
      for (const item in data) {
        if (this.nasdaq100.includes(data[item].symbol)) {
          this.assets.push(data[item]);
        }
      }
      console.log('Assets:', this.assets);
      this.filteredAssets = this.assets.map((asset) => asset.name);
      asset_storage.set(this.assets);
    });

    this.alpacaService.getAccount().subscribe((acc) => {
      console.log('acc', acc);
    });
  }

  updatePage() {
    this.orders = [];
    this.activities = [];
    this.alpacaService.getOrders().subscribe((res) => {
      for (const item in res) {
        this.orders.push(res[item]);
      }
      console.log('Orders:', this.orders);
    });

    this.alpacaService.getActivity().subscribe((res) => {
      for (const item in res) {
        if (res[item].activity_type === 'FILL') {
          this.activities.push(res[item]);
        }
      }
      console.log('Activity:', this.activities);
    });
  }

  onSelectionChange(event: any): void {
    this.selectedAsset = this.assets.filter(
      (a) => a.name == event.option.value
    )[0];

    this.buttonDisabled = false;

    this.alpacaService
      .getLastTrades(this.selectedAsset['symbol'])
      .subscribe((res) => {
        // this.selectedPrice =
        //   Math.round((Number(res['trade'].p) + Number.EPSILON) * 100) / 100;
        this.selectedPrice = Number(parseFloat(res['trade'].p).toFixed(2));
      });
  }

  onInputChange(event: string): void {
    this.inputValue = event;
    this.filteredAssets = this.assets
      .filter(
        (a) =>
          a.name.toLowerCase().includes(event.toLowerCase()) ||
          a.symbol.toLowerCase().includes(event.toLowerCase())
      )
      .map((asset) => asset.name);
    // console.log('this.filteredAssets', this.filteredAssets);
  }

  clearSelect(): void {
    this.inputValue = '';
    this.selectedPrice = null;
    this.selectedAsset = null;
    this.buttonDisabled = true;
    this.filteredAssets = this.assets.map((asset) => asset.name);
  }

  buyAsset() {
    let assetToBuy: AssetToBuy = {
      symbol: this.selectedAsset['symbol'],
      qty: this.quantity.toString(),
      side: 'buy',
      type: 'limit',
      limit_price: this.selectedPrice.toString(),
      time_in_force: 'gtc',
    };
    let body = JSON.stringify(assetToBuy);
    console.log('assetToBuy', assetToBuy);
    this.alpacaService.createOrder(body).subscribe((res) => {
      this.clearSelect();
      this.updatePage();
      console.log('Order response:', res);
    });
  }
}
