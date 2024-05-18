import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradingComponent } from './components/trading-page/trading.component';
import { ChartComponent } from './components/chart-page/chart.component';
import { AssetsComponent } from './components/assets-page/assets.component';

const routes: Routes = [
  {
    path: 'trading',
    component: TradingComponent,
  },
  {
    path: 'chart',
    component: ChartComponent,
  },
  {
    path: 'assets',
    component: AssetsComponent,
  },

  {
    path: '**',
    redirectTo: 'trading',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'trading',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlpacaRoutingModule {}
