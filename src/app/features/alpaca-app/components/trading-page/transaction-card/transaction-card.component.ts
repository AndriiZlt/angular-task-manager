import { Component, Input, OnInit } from '@angular/core';
import { AlpacaService } from '../../../services/alpaca.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { Transaction } from '../../../models/Transaction.model';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionComponent extends SpinnerComponent implements OnInit {
  @Input() transaction: Transaction;
  name: string;
  currentPrice: string;
  date: string;
  isLoading: boolean = true;

  constructor(private alpacaService: AlpacaService) {
    super();
  }

  ngOnInit(): void {
    let date = new Date(this.transaction.transaction_time);
    let dateUTC = date.toUTCString();
    this.date = dateUTC.substring(0, dateUTC.length - 4);

    // Getting full name of the asset
    this.alpacaService
      .getAssetById(this.transaction.symbol)
      .subscribe((res) => {
        this.isLoading = false;
        this.name = res['name'];
      });

    // Getting current price of the stock
    this.alpacaService
      .getLastTrades(this.transaction.symbol)
      .subscribe((res) => {
        this.currentPrice = res['trade'].p;
      });
  }
}
