import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlpacaTradingComponent } from './trading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material-module';
import { RouterModule } from '@angular/router';
import { OrderCardComponent } from '../order-card/order-card.component';
import { ActivityComponent } from '../transaction-card/transaction-card.component';
import { AlpacaTradingRoutingModule } from './trading-routing.module';

@NgModule({
  declarations: [AlpacaTradingComponent, OrderCardComponent, ActivityComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    AlpacaTradingRoutingModule,
  ],
})
export class AlpacaTradingModule {}
