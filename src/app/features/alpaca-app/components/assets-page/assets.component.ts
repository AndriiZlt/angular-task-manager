import { Component, OnInit } from '@angular/core';
import { AlpacaService } from '../../services/alpaca.service';
// import * as asset_storage from '../assets';
import * as nasdaq100 from '../../../../../assets/nasdaq100';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  assets: any[] = [];
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
    this.alpacaService.getPositions().subscribe((res) => {
      for (const item in res) {
        this.positions.push(res[item]);
      }
      console.log('Positions:', res);
    });
  }

  sellAsset(asset_id: any) {
    console.log('sell asset:', asset_id);
    this.alpacaService.closePosition(asset_id).subscribe((res) => {
      console.log('res', res);
      setTimeout(() => this.updatePage(), 500);
    });
  }
}
