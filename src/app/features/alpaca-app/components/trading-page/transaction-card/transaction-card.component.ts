import { Component, Input, OnInit } from '@angular/core';
import { AlpacaService } from '../../../services/alpaca.service';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity: any;
  activityName: string;
  currentPrice: string;
  date: string;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    let date = new Date(this.activity.transaction_time);
    let dateUTC = date.toUTCString();
    this.date = dateUTC.substring(0, dateUTC.length - 4);

    // Getting full name of the asset
    this.alpacaService.getAssetById(this.activity.symbol).subscribe((res) => {
      this.activityName = res['name'];
    });

    // Getting current price of the stock
    this.alpacaService.getLastTrades(this.activity.symbol).subscribe((res) => {
      this.currentPrice = res['trade'].p;
    });
  }
}
