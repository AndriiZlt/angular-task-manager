import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlpacaRoutingModule } from './alpaca-routing.module';
import { TradingComponent } from './components/trading-page/trading.component';
import { OrderCardComponent } from './components/trading-page/order-card/order-card.component';
import { TransactionComponent } from './components/trading-page/transaction-card/transaction-card.component';
import { ChartComponent } from './components/chart-page/chart.component';
import { AssetsComponent } from './components/assets-page/assets.component';
import { AssetCardComponent } from './components/assets-page/asset-card/asset-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material-module';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TradingComponent,
    OrderCardComponent,
    TransactionComponent,
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
    SharedModule,
  ],
})
export class AlpacaModule {}
