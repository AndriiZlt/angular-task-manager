import { Component, Input, OnInit } from '@angular/core';
import { AlpacaService } from 'src/app/services/alpaca.service';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.scss'],
})
export class PositionCardComponent implements OnInit {
  @Input() position: any;
  @Input() assets: any[];
  @Input() index: number;
  positionName: string;
  currentPrice: string;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // console.log('Index:', this.index);

    this.positionName = this.assets.filter(
      (a) => a.symbol === this.position.symbol
    )[0].name;

    // Getting current price of the stock
    this.alpacaService.getLastTrades(this.position.symbol).subscribe((res) => {
      this.currentPrice = res['trade'].p;
    });
  }
}
