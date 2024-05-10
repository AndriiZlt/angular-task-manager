import { Component, Input, OnInit } from '@angular/core';
import { AlpacaService } from 'src/app/services/alpaca.service';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity: any;
  activityName: string;
  currentPrice: string;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // this.activityName = this.assets.filter(
    //   (a) => a.symbol === this.activity.symbol
    // )[0].name;

    // Getting full name of the asset
    this.alpacaService.getAssetById(this.activity.symbol).subscribe((res) => {
      this.activityName = res['name'];
    });

    // Getting current price of the stock
    this.alpacaService.getLastTrades(this.activity.symbol).subscribe((res) => {
      this.currentPrice = res['trade'].p;

      // this.alpacaService.getLastBar(this.activity.symbol).subscribe((res) => {
      // this.currentPrice = res['trade'].p;
      // console.log(
      //   res['symbol'],
      //   '= last bar:',
      //   res['bar'].c,
      //   'last trade:',
      //   this.currentPrice
      // );
      // });
    });
  }
}
