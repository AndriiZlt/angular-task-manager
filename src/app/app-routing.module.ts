import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TasksViewComponent } from './pages/tasks-view/tasks-view.component';
import { FriendsViewComponent } from './pages/friends-view/friends-view.component';
import { PeopleComponent } from './pages/friends-view/people/people.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'task-manager',
    component: TasksViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'friends-list',
    component: FriendsViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'friends-list/people',
    component: PeopleComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
