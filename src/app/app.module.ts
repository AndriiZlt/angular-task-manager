import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksViewComponent } from './pages/tasks-view/tasks-view.component';
import { DetailsComponent } from './pages/tasks-view/details/details.component';
import { TaskComponent } from './pages/tasks-view/task/task.component';
import { MaterialModule } from './material-module';
import { FilterTasksformPipe } from './pipes/filer-tasks.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MyAppComponent } from './my-app/my-app.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { FriendsViewComponent } from './pages/friends-view/friends-view.component';
import { UserCardComponent } from './pages/friends-view/user-card/user-card.component';
import { FriendCardComponent } from './pages/friends-view/friend-card/friend-card.component';
import { PeopleComponent } from './pages/friends-view/people/people.component';
import { FilterFriendsPipe } from './pipes/filter-friends.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TasksViewComponent,
    DetailsComponent,
    TaskComponent,
    FilterTasksformPipe,
    MyAppComponent,
    LoginComponent,
    FriendsViewComponent,
    UserCardComponent,
    FriendCardComponent,
    PeopleComponent,
    FilterFriendsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent],
})
export class AppModule {}

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(),
//     provideHttpClient(),
//     importProvidersFrom(MatNativeDateModule),
//   ],
// }).catch((err) => console.error(err));
