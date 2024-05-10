import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { MyAppComponent } from './pages/my-app/my-app.component';
import { AlpacaChartComponent } from './pages/alpaca-api/chart-page/chart.component';
import { AlpacaTradingComponent } from './pages/alpaca-api/trading-page/trading.component';
import { AlpacaAppComponent } from './pages/alpaca-api/alpaca-app/alpaca-app.component';

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
    path: 'alpaca',
    component: AlpacaAppComponent,
    children: [
      {
        path: 'trading',
        loadChildren: () =>
          import('./pages/alpaca-api/trading-page/trading.module').then(
            (module) => module.AlpacaTradingModule
          ),
      },
      {
        path: 'chart',
        loadChildren: () =>
          import('./pages/alpaca-api/chart-page/chart.module').then(
            (module) => module.AlpacaChartModule
          ),
      },
      {
        path: 'assets',
        loadChildren: () =>
          import('./pages/alpaca-api/assets-page/assets.module').then(
            (module) => module.AlpacaAssetsModule
          ),
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
