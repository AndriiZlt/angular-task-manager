import { Component, Input, OnInit } from '@angular/core';
import { AlpacaService } from 'src/app/services/alpaca.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent implements OnInit {
  @Input() order: any;
  orderName: string;
  currentPrice: string;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // Getting full name of the order
    this.alpacaService.getAssetById(this.order.symbol).subscribe((res) => {
      this.orderName = res['name'];
    });

    // Getting current price of the stock
    this.alpacaService.getLastTrades(this.order.symbol).subscribe((res) => {
      this.currentPrice = res['trade'].p;
    });
  }
}
