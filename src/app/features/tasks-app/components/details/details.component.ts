import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Task } from '../../models/Task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskChangeService } from '../../services/task-change.service';
import { Subtask } from '../../models/Subtask.model';
import { UserTM } from 'src/app/core/user/models/UserTM.model';
import { SubtaskApiService } from '../../services/subtask.service';

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
  users: UserTM[];
  currentUser: UserTM;
  updateModalOn: boolean = false;
  targetSubtaskId: number = null;
  selectedUserId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskChangeService: TaskChangeService,
    private apiService: SubtaskApiService
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.params.id);
    this.getFromLocalStorage();
  }

  onSelect(selectedUsername: string) {
    this.selectedUserId = this.users.filter(
      (u) => u.userName === selectedUsername
    )[0].id;

    this.task.userId = this.selectedUserId;
    this.isDisabled = false;
  }

  onSubtaskDelete(subtaskId: number): void {
    this.apiService.deleteSubtask(subtaskId).subscribe((data) => {
      this.deleteSubtask(subtaskId);
    });
  }

  deleteSubtask(idToDelete: number): void {
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

  updateSubtaskInLC(updatedSubtask: Subtask) {
    let subtaskToUpdate: Subtask = this.filteredSubtasks.filter(
      (s) => s.id === updatedSubtask.id
    )[0];

    let index = this.filteredSubtasks.indexOf(subtaskToUpdate);

    if (this.filteredSubtasks[index].taskId !== updatedSubtask.taskId) {
      this.deleteSubtask(subtaskToUpdate.id);
    } else {
      this.filteredSubtasks[index].description = updatedSubtask.description;
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
    this.taskChangeService.triggerEvent({ action: 'taskStatusChange', index });

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
    this.taskChangeService.triggerEvent({
      action: 'delete',
      taskId: this.task.id,
    });
    this.router.navigate(['task-manager']);
  }

  getFromLocalStorage(): void {
    // USERS
    let usersLC = localStorage.getItem('users');
    if (usersLC !== null && usersLC !== 'undefined') {
      this.users = JSON.parse(usersLC);
      // this.currentUser = users.filter(u=>u.id===this.task.userId)
    }
    // SUBTASK
    let subtasksFromLC = localStorage.getItem('subtasks');
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
    // TASK
    let tasksFromLC = localStorage.getItem('tasks');
    if (
      tasksFromLC !== '' &&
      tasksFromLC !== null &&
      tasksFromLC !== 'undefined'
    ) {
      this.task = JSON.parse(tasksFromLC).filter(
        (task: Task) => task.id === this.taskId
      )[0];
      this.selectedUserId = this.task.id;

      if (this.task.status === 'completed') {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    }

    this.taskIndex = JSON.parse(localStorage.getItem('detailsIndex'));
  }

  back(): void {
    this.router.navigate(['task-manager']);
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
      console.log('Sending this task:', this.task);
      this.taskChangeService.triggerEvent({
        action: 'edit',
        task: this.task,
      });
      this.router.navigate(['task-manager']);
    } else {
      console.log('Empty title!');
    }
  }

  // Modal
  modalClose() {
    this.updateModalOn = false;
  }

  openUpdateModal(subtaskId: number) {
    this.targetSubtaskId = subtaskId;
    this.updateModalOn = true;
  }
}
