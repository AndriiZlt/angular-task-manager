import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then((module) => module.AuthModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'task',
    loadChildren: () =>
      import('./features/tasks-app/tasks.module').then(
        (module) => module.TasksModule
      ),
    // canActivate: [AuthGuard],
  },

  {
    path: 'friends',
    loadChildren: () =>
      import('./features/friends-app/friends.module').then(
        (module) => module.FriendsModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'alpaca',
    loadChildren: () =>
      import('./features/alpaca-app/alpaca.module').then(
        (module) => module.AlpacaModule
      ),
  },

  { path: '**', redirectTo: 'auth/login' },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
