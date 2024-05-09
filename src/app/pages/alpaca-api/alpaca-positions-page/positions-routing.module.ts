import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlpacaPositionsComponent } from './alpaca-positions.component';

const routes: Routes = [
  {
    path: '',
    component: AlpacaPositionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlpacaAssetsRoutingModule {}