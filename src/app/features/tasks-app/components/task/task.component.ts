import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subtask } from '../../models/Subtask.model';
import { Task } from '../../models/Task.model';
import { TaskManagerService } from '../../services/task-manager.service';
import { TaskManagerApiService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
    private taskManagerService: TaskManagerService,
    private apiService: TaskManagerApiService
  ) {}

  ngOnInit(): void {
    if (this.subtasks) {
      this.filteredSubtasks = this.subtasks.filter(
        (s) => s.taskId === this.task.id
      );
    }
  }

  onCheckClick(): void {
    this.taskManagerService.triggerEvent({
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
    this.apiService.deleteSubtask(subtaskId).subscribe((data) => {
      this.updateSubtasks(subtaskId);
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
