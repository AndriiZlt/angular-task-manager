import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlpacaTradingComponent } from './alpaca-trasactions.component';

const routes: Routes = [
  {
    path: '',
    component: AlpacaTradingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlpacaTradingRoutingModule {}
