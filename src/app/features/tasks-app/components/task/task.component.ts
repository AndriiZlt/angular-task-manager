import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subtask } from '../../models/Subtask.model';
import { Task } from '../../models/Task.model';
import { TaskChangeService } from '../../services/task-change.service';
import { SubtaskApiService } from '../../services/subtask.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() taskIndex: number;
  @Input() subtasks: Subtask[];
  @Output() onTaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDetailsClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() modalOpen: EventEmitter<any> = new EventEmitter<any>();
  @Output() checkSubtask: EventEmitter<any> = new EventEmitter<any>();
  @Output() openUpdateModal: EventEmitter<any> = new EventEmitter<any>();
  filteredSubtasks: Subtask[];

  constructor(
    private taskChangeService: TaskChangeService,
    private apiService: SubtaskApiService
  ) {}

  ngOnInit(): void {
    if (this.subtasks) {
      this.filteredSubtasks = this.subtasks.filter(
        (s) => s.taskId === this.task.id
      );
    }
  }

  onCheckClick(): void {
    this.taskChangeService.triggerEvent({
      action: 'taskStatusChange',
      id: this.task.id,
    });
  }

  onCardClick(index: number): void {
    this.onDetailsClick.emit(index);
  }

  openModal() {
    this.modalOpen.emit(this.task.id);
  }

  onSubtaskDelete(subtaskId: number) {
    let sub = this.apiService.deleteSubtask(subtaskId).subscribe((data) => {
      this.updateSubtasks(subtaskId);
      sub.unsubscribe();
    });
  }

  updateSubtasks(idToDelete: number): void {
    this.filteredSubtasks = this.filteredSubtasks.filter(
      (s) => s.id !== idToDelete
    );

    let subtasksFromLC: Subtask[] = JSON.parse(
      localStorage.getItem('subtasks')
    );
    if (subtasksFromLC) {
      let newsubtasks = subtasksFromLC.filter((s) => s.id !== idToDelete);
      localStorage.setItem('subtasks', JSON.stringify(newsubtasks));
    }
  }

  openUpdateModalHandler(event) {
    this.openUpdateModal.emit(event);
  }

  emitCheckSubtask(id: number) {
    this.checkSubtask.emit(id);
  }
}
