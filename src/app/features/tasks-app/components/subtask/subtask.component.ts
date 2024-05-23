import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subtask } from '../../models/Subtask.model';
import { TaskChangeService } from '../../services/task-change.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss'],
})
export class SubtaskComponent implements OnInit {
  @Input() subtask: Subtask;
  @Input() subtaskIndex: number;
  @Output() onSubtaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() checkSubtask: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSubtask: EventEmitter<any> = new EventEmitter<any>();
  @Output() openUpdateModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private taskChangeService: TaskChangeService) {}

  ngOnInit(): void {}

  openModal() {
    this.openUpdateModal.emit(this.subtask.id);
  }

  onCheckClick(index: number): void {
    this.taskChangeService.triggerEvent({
      action: 'taskStatusChange',
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
