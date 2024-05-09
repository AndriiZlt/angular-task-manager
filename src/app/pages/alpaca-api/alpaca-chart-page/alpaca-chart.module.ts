import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlpacaChartComponent } from './alpaca-chart.component';
import { AlpacaChartRoutingModule } from './trading-routing.module';

@NgModule({
  declarations: [AlpacaChartComponent],
  imports: [CommonModule, AlpacaChartRoutingModule],
})
export class AlpacaChartModule {}
