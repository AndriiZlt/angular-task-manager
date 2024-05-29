import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlpacaService } from '../../../services/alpaca.service';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent implements OnInit {
  @Input() position: any;
  @Input() index: number;
  @Output() sellAsset: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // Getting full name of the order
    this.alpacaService.getAssetById(this.position.symbol).subscribe((res) => {
      this.positionName = res['name'];
      this.nameIsLoading = false;
    });

    // Getting current price of the asset
    this.alpacaService.getLastTrades(this.position.symbol).subscribe((res) => {
      this.currentPrice = res['trade'].p;
      this.priceIsLoading = false;
    });
  }

  sellPosition() {
    console.log('Emiting event:', this.position.asset_id);
    this.sellAsset.emit(this.position.asset_id);
  }
}
