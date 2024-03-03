import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './pages/home-view/home-view.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { TaskComponent } from './task/task.component';
import { MaterialModule } from './material-module';
import { FilterTasksformPipe } from './pipes/filer-tasks.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MyAppComponent } from './pages/my-app/my-app.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    TaskViewComponent,
    TaskComponent,
    FilterTasksformPipe,
    MyAppComponent,
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
