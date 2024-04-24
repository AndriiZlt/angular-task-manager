import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subtask } from 'src/app/models/Subtask.model';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtaskComponent implements OnInit {
  @Input() subtask: Subtask;
  @Input() subtaskIndex: number;
  @Output() onSubtaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() checkSubtask: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSubtask: EventEmitter<any> = new EventEmitter<any>();
  @Output() openUpdateModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private taskManagerService: TaskManagerService) {}

  ngOnInit(): void {}

  openModal() {
    this.openUpdateModal.emit(this.subtask.id);
  }

  onCheckClick(index: number): void {
    this.taskManagerService.triggerEvent({
      action: 'check',
      taskId: this.subtask.id,
    });

    this.checkSubtask.emit(this.subtask.id);
  }

  deleteSubtask() {
    this.onSubtaskDelete.emit(this.subtask.id);
  }

  statusUpdate() {
    this.checkSubtask.emit(this.subtask.id);
  }
}
