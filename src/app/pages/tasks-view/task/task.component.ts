import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subtask } from 'src/app/models/Subtask';
import { Task } from 'src/app/models/Task';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() taskIndex: number;
  @Input() subtasks: Subtask[];
  @Output() onTaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDetailsClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalOpen: EventEmitter<any> = new EventEmitter<any>();
  filteredSubtasks: Subtask[];

  constructor(private taskManagerService: TaskManagerService) {}

  ngOnInit(): void {
    if (this.subtasks) {
      this.filteredSubtasks = this.subtasks.filter(
        (s) => s.taskId === this.task.id
      );
    }
  }

  onCheckClick(index: number): void {
    this.taskManagerService.triggerEvent({
      action: 'check',
      taskId: this.task.id,
    });
  }

  onCardClick(index: number): void {
    this.onDetailsClick.emit(index);
  }

  openModal() {
    this.modalOpen.emit(this.task.id);
  }
}
