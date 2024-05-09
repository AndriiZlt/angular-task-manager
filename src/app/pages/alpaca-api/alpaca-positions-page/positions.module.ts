import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlpacaAssetsRoutingModule } from './positions-routing.module';
import { AlpacaPositionsComponent } from './alpaca-positions.component';
import { PositionCardComponent } from './position-card/position-card.component';

@NgModule({
  declarations: [AlpacaPositionsComponent, PositionCardComponent],
  imports: [CommonModule, AlpacaAssetsRoutingModule],
})
export class AlpacaAssetsModule {}
