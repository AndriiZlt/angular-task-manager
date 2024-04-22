import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChange,
} from '@angular/core';
import { Task } from 'src/app/models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { Subtask } from 'src/app/models/Subtask';
import { TaskManagerApiService } from 'src/app/services/task-managerApi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  task: Task;
  isChecked: boolean;
  taskIndex: number = -1;
  taskId: number = null;
  isDisabled: boolean = true;
  height: string;
  filteredSubtasks: Subtask[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskManagerService: TaskManagerService,
    private apiService: TaskManagerApiService
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.params.id);
    this.getFromLocalStorage();
    localStorage.setItem('lastUrl', `home/task-manager/task/${this.taskId}`);
  }

  onSubtaskDelete(subtaskId: number): void {
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

  checkSubtask(subtaskId: number): void {
    this.apiService.updateStatusSubtask(subtaskId).subscribe((_) => {
      this.updateStatusSubtask(subtaskId);
    });
  }

  updateStatusSubtask(subtaskId: number): void {
    let subtaskToUpdate: Subtask = this.filteredSubtasks.filter(
      (s) => s.id === subtaskId
    )[0];

    let index = this.filteredSubtasks.indexOf(subtaskToUpdate);

    this.filteredSubtasks[index].status = 'undone' ? 'completed' : 'undone';

    let subtasksFromLC: Subtask[] = JSON.parse(
      localStorage.getItem('subtasks')
    );
    if (subtasksFromLC) {
      subtasksFromLC[index].status =
        subtasksFromLC[index].status === 'completed' ? 'undone' : 'completed';
      localStorage.setItem('subtasks', JSON.stringify(subtasksFromLC));
    }
  }

  checkHandler(index: number): void {
    this.taskManagerService.triggerEvent({ action: 'check', index });

    if (this.task.status === 'completed') {
      this.task.status = 'undone';
      this.isChecked = false;
    } else {
      this.task.status = 'completed';
      this.isChecked = true;
    }

    this.isDisabled = false;
  }

  deleteHandler(index: number): void {
    this.taskManagerService.triggerEvent({
      action: 'delete',
      taskId: this.task.id,
    });
    this.router.navigate(['home/task-manager']);
  }

  getFromLocalStorage(): void {
    this.taskIndex = JSON.parse(localStorage.getItem('detailsIndex'));

    let subtasksFromLC = localStorage.getItem('subtasks');
    console.log('subtasks from local storage:', JSON.parse(subtasksFromLC));
    if (
      subtasksFromLC !== '' &&
      subtasksFromLC !== null &&
      subtasksFromLC !== 'undefined'
    ) {
      this.filteredSubtasks = JSON.parse(subtasksFromLC).filter(
        (subtask: Subtask) => subtask.taskId === this.taskId
      );
      console.log('Friltered subtasks:', this.filteredSubtasks);
    }

    let tasksFromLC = localStorage.getItem('tasks');
    if (
      tasksFromLC !== '' &&
      tasksFromLC !== null &&
      tasksFromLC !== 'undefined'
    ) {
      this.task = JSON.parse(tasksFromLC).filter(
        (task: Task) => task.id === this.taskId
      )[0];

      if (this.task.status === 'completed') {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    }
  }

  back(): void {
    this.router.navigate(['home/task-manager']);
  }

  onEdit(field: string, value: string): void {
    if (this.task.title === '') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }

    switch (field) {
      case 'title':
        this.task.title = this.capitalize(value);
        break;
      case 'description':
        this.task.description = this.capitalize(value);
        break;
      case 'status':
        this.task.status =
          this.task.status === 'undone' ? 'completed' : 'undone';
        break;
      default:
        console.log(
          'Something went wrong while editing Task in the detailed view!',
          field,
          value
        );
    }
  }

  capitalize(value: string): string {
    let capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    return capitalizedValue;
  }

  saveHandler(): void {
    if (this.task.title !== '') {
      this.taskManagerService.triggerEvent({
        action: 'edit',
        task: this.task,
      });
      this.router.navigate(['home/task-manager']);
    } else {
      console.log('Empty title!');
    }
  }
}
