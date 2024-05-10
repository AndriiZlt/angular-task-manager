import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlpacaAssetsRoutingModule } from './assets-routing.module';
import { AlpacaPositionsComponent } from './assets.component';
import { PositionCardComponent } from '../asset-card/asset-card.component';

@NgModule({
  declarations: [AlpacaPositionsComponent, PositionCardComponent],
  imports: [CommonModule, AlpacaAssetsRoutingModule],
})
export class AlpacaAssetsModule {}
