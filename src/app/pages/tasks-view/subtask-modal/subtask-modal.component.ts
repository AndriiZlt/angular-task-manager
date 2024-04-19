import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subtask } from 'src/app/models/Subtask';
import { SubtaskToAdd } from 'src/app/models/SubtaskToAdd';
import { TaskManagerApiService } from 'src/app/services/task-managerApi.service';

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
  @Input() subtasks: Subtask[];
  @Input() taskId: number;
  @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(private apiService: TaskManagerApiService) {}

  ngOnInit(): void {
    console.log(this.taskId);
  }

  onFormChange(field: string, value: string): void {
    if (this.title === '' || this.description === '') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }

    switch (field) {
      case 'title':
        this.title = this.capitalize(value);
        break;
      case 'description':
        this.description = this.capitalize(value);
        break;
    }
  }

  capitalize(value: string): string {
    let capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    return capitalizedValue;
  }

  updateInput(title: string = ''): void {
    this.description = '';
    this.title = title;
  }

  addSubtask(): void {
    if (this.title !== '') {
      let subtaskToAdd: SubtaskToAdd = {
        title: this.capitalize(this.title),
        description: this.capitalize(this.description),
        taskId: this.taskId,
      };
      this.apiService.addSubtask(subtaskToAdd).subscribe((data) => {
        this.closeModal();
      });
    } else {
      alert('The title is empty!');
    }
  }

  closeModal() {
    this.modalClose.emit();
  }
}
