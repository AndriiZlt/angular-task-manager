import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlpacaService } from '../../../services/alpaca.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order: any;
  @Output() closeOrder: EventEmitter<any> = new EventEmitter<any>();
  orderName: string;
  currentPrice: string;
  date: string;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    let date = new Date(this.order.created_at);
    let dateUTC = date.toUTCString();
    this.date = dateUTC.substring(0, dateUTC.length - 4);

    // Getting full name of the order
    this.alpacaService.getAssetById(this.order.symbol).subscribe((res) => {
      this.orderName = res['name'];
    });

    // Getting current price of the stock
    this.alpacaService.getLastTrades(this.order.symbol).subscribe((res) => {
      this.currentPrice = res['trade'].p;
    });
  }

  cancelOrder() {
    this.closeOrder.emit(this.order.id);
  }
}
