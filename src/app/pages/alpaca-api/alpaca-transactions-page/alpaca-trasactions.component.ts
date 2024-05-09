import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlpacaService } from 'src/app/services/alpaca.service';
import * as assets from '../assets';
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
  nasdaq100: string[] = [
    'AAPL',
    'ABNB',
    'ADBE',
    'ADI',
    'ADP',
    'ADSK',
    'AEP',
    'AMAT',
    'AMD',
    'AMGN',
    'AMZN',
    'ANSS',
    'ASML',
    'AVGO',
    'AZN',
    'BIIB',
    'BKNG',
    'BKR',
    'CCEP',
    'CDNS',
    'CDW',
    'CEG',
    'CHTR',
    'CMCSA',
    'COST',
    'CPRT',
    'CRWD',
    'CSCO',
    'CSGP',
    'CSX',
    'CTAS',
    'CTSH',
    'DASH',
    'DDOG',
    'DLTR',
    'DXC',
    'EA',
    'EXC',
    'FANG',
    'FAST',
    'FTNT',
    'GEHC',
    'GFS',
    'GILD',
    'GOOG',
    'GOOGL',
    'HON',
    'IDXX',
    'ILMN',
    'INTC',
    'INTU',
    'ISRG',
    'KDP',
    'KHC',
    'KLAC',
    'LIN',
    'LRCX',
    'LULU',
    'MAR',
    'MCHP',
    'MDB',
    'MDLZ',
    'MELI',
    'META',
    'MNST',
    'MRNA',
    'MRVL',
    'MSFT',
    'MU',
    'NFLX',
    'NVDA',
    'NXPI',
    'ODFL',
    'ON',
    'ORLY',
    'PANW',
    'PAYX',
    'PCAR',
    'PDD',
    'PEP',
    'PYPL',
    'QCOM',
    'REGN',
    'ROP',
    'ROST',
    'SBUX',
    'SIRI',
    'SNPS',
    'TEAM',
    'TMUS',
    'TSLA',
    'TTD',
    'TTWO',
    'TXN',
    'VRSK',
    'VRTX',
    'WBA',
    'WBD',
    'WDAY',
    'XEL',
    'ZS',
  ];
  filteredAssets: string[];
  selectedAsset = new Object();
  selectedPrice: number;
  quantity: number = 1;
  authHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Basic Q0tMMVAyQkE4TVRNUkhSWDBCT1I6MmVIRWJxamkyakRmdmxuZkMwU25DWTJobFRKWVhwVEowRFJLREQ0Sg==',
  });
  inputValue: string;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  isDisabled: boolean = true;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // this.alpacaService.getAssets(this.headers).subscribe((data) => {
    //   console.log('data', data);
    //   for (const item in data) {
    //     if (this.nasdaq100.includes(data[item].symbol)) {
    //       this.assets.push(data[item]);
    //     }
    //   }
    // });

    // console.log('Assets:', assets.getAssets());

    this.assets = [...assets.getAssets()]; //comment out
    this.filteredAssets = this.assets.map((asset) => asset.name);

    this.alpacaService.getAccount().subscribe((acc) => {
      console.log('acc', acc);
    });

    this.updatePage();
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

    this.isDisabled = false;

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
    this.isDisabled = true;
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

    this.alpacaService.createOrder(body).subscribe((res) => {
      this.clearSelect();
      this.updatePage();
      console.log('Order response:', res);
    });
  }
}
