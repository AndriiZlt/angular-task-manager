import { Component, OnInit } from '@angular/core';
import { AlpacaService } from 'src/app/services/alpaca.service';
import * as assets from '../assets';

@Component({
  selector: 'app-alpaca-positions',
  templateUrl: './alpaca-positions.component.html',
  styleUrls: ['./alpaca-positions.component.scss'],
})
export class AlpacaPositionsComponent implements OnInit {
  assets: any[] = [];
  constructor(private alpacaService: AlpacaService) {}
  positions: any[] = [];

  ngOnInit(): void {
    this.alpacaService.getPositions().subscribe((res) => {
      for (const item in res) {
        this.positions.push(res[item]);
      }
      console.log('Positions:', res);
    });

    // this.alpacaService.getAssets(this.headers).subscribe((data) => {
    //   console.log('data', data);
    //   for (const item in data) {
    //     if (this.nasdaq100.includes(data[item].symbol)) {
    //       this.assets.push(data[item]);
    //     }
    //   }
    // });

    // console.log('Assets:', assets.getAssets());

    this.assets = [...assets.getAssets()]; //comment out
  }
}
