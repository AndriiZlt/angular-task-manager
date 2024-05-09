import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MyAppComponent } from '../pages/my-app/my-app.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FriendsViewModule } from '../pages/friends-view/friends-view.module';
import { StoreModule } from '@ngrx/store';
import { sutaskReducer } from '../reducers/tm.reducer';
import { Interceptor } from '../helpers/interceptor';
import { AlpacaTransactionsModule } from '../pages/alpaca-api/alpaca-transactions-page/transactions.module';
import { AlpacaAppComponent } from '../pages/alpaca-api/alpaca-app/alpaca-app.component';
import { AlpacaChartModule } from '../pages/alpaca-api/alpaca-chart-page/alpaca-chart.module';
import { AlpacaAssetsModule } from '../pages/alpaca-api/alpaca-positions-page/positions.module';
@NgModule({
  declarations: [AppComponent, MyAppComponent, AlpacaAppComponent],
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
    AlpacaTransactionsModule,
    AlpacaChartModule,
    AlpacaAssetsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent],
})
export class AppModule {}
