import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlpacaService } from 'src/app/services/alpaca.service';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class PositionCardComponent implements OnInit {
  @Input() position: any;
  @Input() index: number;
  @Output() sellAsset: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // Getting full name of the order
    this.alpacaService.getAssetById(this.position.symbol).subscribe((res) => {
      this.positionName = res['name'];
    });

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
