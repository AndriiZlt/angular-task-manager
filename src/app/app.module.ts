import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MyAppComponent } from './pages/my-app.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FriendsViewModule } from './pages/friends-view/friends-view.module';
import { StoreModule } from '@ngrx/store';
import { sutaskReducer } from './reducers/tm.reducer';

@NgModule({
  declarations: [AppComponent, MyAppComponent],
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
    FriendsViewModule,
    StoreModule.forRoot({
      subtask: sutaskReducer,
    }),
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
