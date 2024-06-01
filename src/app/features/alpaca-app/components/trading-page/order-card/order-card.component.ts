import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlpacaService } from '../../../services/alpaca.service';
import { Order } from '../../../models/Order.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order: Order;
  @Output() closeOrder: EventEmitter<any> = new EventEmitter<any>();
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

  cancelOrder() {
    this.closeOrder.emit(this.order.id);
  }
}
