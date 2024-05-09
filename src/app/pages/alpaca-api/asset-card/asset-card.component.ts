import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AlpacaService } from 'src/app/services/alpaca.service';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent implements OnInit {
  @Input() order: any;
  @Input() assets: any[];
  @Input() authHeaders: HttpHeaders;
  orderName: string;
  currentPrice: string;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // console.log('order', this.order);

    // Getting name of the stock
    this.orderName = this.assets.filter(
      (a) => a.symbol === this.order.symbol
    )[0].name;

    // Getting current price of the stock
    this.alpacaService.getLastTrades(this.order.symbol).subscribe((res) => {
      this.currentPrice = res['trade'].p;
      // console.log('last trade:', res['symbol'], ':', res['trade'].p);
    });

    // this.alpacaService.getLastBar(this.order.symbol).subscribe((res) => {
    //   // this.currentPrice = res['trade'].p;
    //   console.log('last bar:', res['symbol'], ':', res['bar'].c);
    // });
  }
}
