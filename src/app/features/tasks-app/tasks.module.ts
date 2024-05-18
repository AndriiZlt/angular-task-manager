import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskManagerComponent } from './components/task-manager.component';
import { MaterialModule } from 'src/app/shared/modules/material-module';
import { TasksPipe } from './pipes/tasks.pipe';
import { DetailsComponent } from './components/details/details.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';
import { SubtaskComponent } from './components/subtask/subtask.component';
import { TaskChartComponent } from './components/chart/task-chart/taskChart.component';
import { SubtaskModalComponent } from './components/subtask-modal/subtask-modal.component';

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
  imports: [CommonModule, TasksRoutingModule, MaterialModule, FormsModule],
})
export class TasksModule {}
