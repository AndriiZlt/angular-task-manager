import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlpacaRoutingModule } from './alpaca-routing.module';
import { TradingComponent } from './components/trading-page/trading.component';
import { OrderCardComponent } from './components/trading-page/order-card/order-card.component';
import { ActivityComponent } from './components/trading-page/transaction-card/transaction-card.component';
import { ChartComponent } from './components/chart-page/chart.component';
import { AssetsComponent } from './components/assets-page/assets.component';
import { AssetCardComponent } from './components/assets-page/asset-card/asset-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material-module';

@NgModule({
  declarations: [
    TradingComponent,
    OrderCardComponent,
    ActivityComponent,
    ChartComponent,
    AssetsComponent,
    AssetCardComponent,
  ],
  imports: [
    CommonModule,
    AlpacaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AlpacaModule {}
