import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlpacaService } from '../../../services/alpaca.service';
import { Position } from '../../../models/Positions.model';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.scss'],
})
export class AssetCardComponent implements OnInit {
  @Input() position: Position;
  @Input() index: number;
  @Output() sellAsset: EventEmitter<any> = new EventEmitter<any>();
  positionName: string;
  currentPrice: string;
  nameIsLoading: boolean = true;
  priceIsLoading: boolean = true;

  constructor(private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    // Getting full name of the order
    let sub = this.alpacaService
      .getAssetById(this.position.symbol)
      .subscribe((res) => {
        this.positionName = res.name;
        this.nameIsLoading = false;
        sub.unsubscribe();
      });

    // Getting current price of the asset
    let sub2 = this.alpacaService
      .getLastTrades(this.position.symbol)
      .subscribe((res) => {
        this.currentPrice = res['trade'].p;
        this.priceIsLoading = false;
        sub2.unsubscribe();
      });
  }

  sellPosition() {
    this.sellAsset.emit(this.position.asset_Id);
  }
}
