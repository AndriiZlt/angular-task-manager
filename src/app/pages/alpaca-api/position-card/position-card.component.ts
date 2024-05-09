import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() sellAsset: EventEmitter<any> = new EventEmitter<any>();
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

  sellPosition() {
    console.log('Emiting event:', this.position.asset_id);
    this.sellAsset.emit(this.position.asset_id);
  }
}
