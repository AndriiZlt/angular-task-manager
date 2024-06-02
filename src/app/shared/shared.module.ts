import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StatusComponent } from './components/status/status.component';
import { MaterialModule } from './modules/material-module';

@NgModule({
  declarations: [SpinnerComponent, StatusComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SpinnerComponent, StatusComponent, MaterialModule],
})
export class SharedModule {}
