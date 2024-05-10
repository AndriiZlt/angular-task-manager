import { Component, OnInit } from '@angular/core';
import { AlpacaService } from 'src/app/services/alpaca.service';
import * as assets from '../assets';
import * as nasdaq100 from '../nasdaq100';

@Component({
  selector: 'app-alpaca-positions',
  templateUrl: './alpaca-positions.component.html',
  styleUrls: ['./alpaca-positions.component.scss'],
})
export class AlpacaPositionsComponent implements OnInit {
  assets: any[] = [];
  nasdaq100: string[];
  positions: any[] = [];

  constructor(private alpacaService: AlpacaService) {
    this.nasdaq100 = nasdaq100.get();
  }

  ngOnInit(): void {
    this.resetPage();
  }

  resetPage() {
    this.positions = [];
    this.alpacaService.getPositions().subscribe((res) => {
      for (const item in res) {
        this.positions.push(res[item]);
      }
      console.log('Positions:', res);
    });

    this.alpacaService.getAssets().subscribe((data) => {
      console.log('data', data);
      for (const item in data) {
        if (this.nasdaq100.includes(data[item].symbol)) {
          this.assets.push(data[item]);
        }
      }
    });

    console.log('Assets:', this.assets);

    //this.assets = [...assets.getAssets()]; //comment out
  }

  sellAsset(asset_id: any) {
    console.log('sell asset:', event);
    this.alpacaService.closePosition(asset_id).subscribe((res) => {
      console.log('res', res);
      setTimeout(() => this.resetPage(), 500);
    });
  }
}
