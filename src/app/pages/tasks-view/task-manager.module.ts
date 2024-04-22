import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { TaskManagerComponent } from './task-manager.component';
import { MaterialModule } from 'src/app/material-module';
import { TasksPipe } from 'src/app/pipes/tasks.pipe';
import { DetailsComponent } from './details/details.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { SubtaskComponent } from './subtask/subtask.component';
import { TaskChartComponent } from '../charts/task-chart/taskChart.component';
import { SubtaskModalComponent } from './subtask-modal/subtask-modal.component';

@NgModule({
  declarations: [
    TaskManagerComponent,
    TasksPipe,
    DetailsComponent,
    TaskComponent,
    SubtaskComponent,
    TaskChartComponent,
    SubtaskModalComponent,
  ],
  imports: [
    CommonModule,
    TaskManagerRoutingModule,
    MaterialModule,
    FormsModule,
  ],
})
export class TaskManagerModule {}
