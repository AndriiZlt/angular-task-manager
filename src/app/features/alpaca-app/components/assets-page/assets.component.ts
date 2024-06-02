import { Component, OnInit } from '@angular/core';
import { AlpacaService } from '../../services/alpaca.service';
import * as nasdaq100 from '../../assets/nasdaq100';
import { Asset } from '../../models/Asset.model';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  assets: Asset[] = [];
  nasdaq100: string[];
  positions: any[] = [];

  constructor(private alpacaService: AlpacaService) {
    this.nasdaq100 = nasdaq100.get();
  }

  ngOnInit(): void {
    this.updatePage();
  }

  updatePage() {
    this.positions = [];
    let sub = this.alpacaService.getPositions().subscribe((res) => {
      for (const item in res) {
        this.positions.push(res[item]);
      }
      sub.unsubscribe();
    });
  }

  sellAsset(asset_id: any) {
    let sub = this.alpacaService.closePosition(asset_id).subscribe((res) => {
      setTimeout(() => {
        this.updatePage();
        sub.unsubscribe();
      }, 500);
    });
  }
}
