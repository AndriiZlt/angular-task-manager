import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlpacaChartComponent } from './chart.component';

const routes: Routes = [
  {
    path: '',
    component: AlpacaChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlpacaChartRoutingModule {}
