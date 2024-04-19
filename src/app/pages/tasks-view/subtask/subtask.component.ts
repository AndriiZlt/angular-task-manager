import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subtask } from 'src/app/models/Subtask';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtaskComponent implements OnInit {
  @Input() subtask: Subtask;
  @Input() subtaskIndex: number;
  @Output() onTaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDetailsClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private taskManagerService: TaskManagerService) {}

  ngOnInit(): void {}

  onCheckClick(index: number): void {
    this.taskManagerService.triggerEvent({
      action: 'check',
      taskId: this.subtask.id,
    });
  }

  onCardClick(index: number): void {
    this.onDetailsClick.emit(index);
  }
}
