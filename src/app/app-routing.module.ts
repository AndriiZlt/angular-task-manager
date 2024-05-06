import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MyAppComponent } from './pages/my-app.component';
import { AlpacaChartComponent } from './pages/alpaca-api/alpaca-chart/alpaca-chart.component';
import { AlpacaTradingComponent } from './pages/alpaca-api/alpaca-trading/alpaca-trading/alpaca-trading.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((module) => module.LoginModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (module) => module.RegisterModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: MyAppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'task-manager',
        loadChildren: () =>
          import('./pages/tasks-view/task-manager.module').then(
            (module) => module.TaskManagerModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'friends-list',
        loadChildren: () =>
          import('./pages/friends-view/friends-view.module').then(
            (module) => module.FriendsViewModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'alpaca-chart',
    component: AlpacaChartComponent,
  },
  {
    path: 'alpaca-trading',
    component: AlpacaTradingComponent,
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
