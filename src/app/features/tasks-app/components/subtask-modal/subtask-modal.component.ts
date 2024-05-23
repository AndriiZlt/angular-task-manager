import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subtask } from '../../models/Subtask.model';
import { SubtaskToAdd } from '../../models/SubtaskToAdd.model';
import { Task } from '../../models/Task.model';
import { TaskChangeService } from '../../services/task-change.service';
import { SubtaskApiService } from '../../services/subtask.service';

@Component({
  selector: 'app-subtask-modal',
  templateUrl: './subtask-modal.component.html',
  styleUrls: ['./subtask-modal.component.scss'],
})
export class SubtaskModalComponent implements OnInit {
  title: string = '';
  description: string = '';
  datePickerDate: string = null;
  isDisabled: boolean = true;
  tasks: Task[];
  subtasks: Subtask[];
  targetSubtask: Subtask;
  filteredTasks: Task[];
  mainTask: Task;
  selectedTaskId: number;
  @Input() targetSubtaskId: number = null;
  @Input() subtask: Subtask;
  @Input() taskId: number;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSubtask: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private taskChangeService: TaskChangeService,
    private apiService: SubtaskApiService
  ) {}

  ngOnInit(): void {
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    this.subtasks = JSON.parse(localStorage.getItem('subtasks'));
    this.targetSubtask = this.targetSubtaskId
      ? this.subtasks.filter((s) => s.id === this.targetSubtaskId)[0]
      : null;

    this.description = this.targetSubtaskId
      ? this.targetSubtask.description
      : '';

    this.mainTask = this.tasks.filter((t) => t.id === this.taskId)[0];

    this.filteredTasks = this.tasks.filter((t) => t.id !== this.taskId);
    if (this.mainTask) {
      this.selectedTaskId = this.mainTask.id;
    }

    this.title = this.targetSubtaskId ? 'Update Subtask' : 'Create Subtask';
  }

  onSelect(event: string) {
    let selectedTitle = event.split(':')[0];
    this.selectedTaskId = this.tasks.filter(
      (t) => t.title === selectedTitle
    )[0].id;
    this.isDisabled = false;
    console.log('Task CHanged to :', this.selectedTaskId);
  }

  onFormChange(field: string, value: string): void {
    if (this.description === '') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }

    this.description = this.capitalize(value);
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  updateInput(title: string = ''): void {
    this.description = '';
  }

  addSubtask(): void {
    if (!this.targetSubtaskId) {
      let subtaskToAdd: SubtaskToAdd = {
        title: '',
        description: this.capitalize(this.description),
        taskId: this.selectedTaskId,
      };
      this.apiService.addSubtask(subtaskToAdd).subscribe((data) => {
        this.closeModal();
      });
    } else {
      let subtaskToUpdate: Subtask = this.targetSubtask;
      subtaskToUpdate.description = this.capitalize(this.description);
      subtaskToUpdate.taskId = this.selectedTaskId;
      this.apiService.updateSubtask(subtaskToUpdate).subscribe((res) => {
        this.updateSubtask.emit(subtaskToUpdate);
        this.closeModal();
      });
    }

    this.taskChangeService.triggerEvent({
      action: 'updatePage',
      id: null,
    });
  }

  closeModal() {
    this.modalClose.emit();
  }
}
