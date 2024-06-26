import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/Task.model';
import { TaskToAdd } from '../models/TaskToAdd.model';
import { TaskChangeService } from '../services/task-change.service';
import { TaskApiService } from '../services/task.service';
import { DatePipe } from '@angular/common';
import { Subtask } from '../models/Subtask.model';
import { User } from 'src/app/core/user/models/User.model';
import { HubConnectionService } from 'src/app/core/services/hub-connection.service';
import { SubtaskApiService } from '../services/subtask.service';
import { UserApiService } from 'src/app/core/user/services/user.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

enum TaskFilterValue {
  'all' = 1,
  'unfinished' = 2,
  'completed' = 3,
}

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  providers: [DatePipe],
})
export class TaskManagerComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  subtasks: Subtask[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];
  currentUser: User;
  title: string = '';
  description: string = '';
  dueDate: string = null;
  datePickerDate: string = null;
  targetSubtaskId: number;
  filter: TaskFilterValue = TaskFilterValue.all;
  isDisabled: boolean = true;
  addModalOn: boolean = false;
  updateModalOn: boolean = false;
  modalTaskId: number;
  selectedUser: User = {
    id: null,
    email: 'null',
    userName: '',
    name: 'string',
    surname: 'string',
  };
  subscription: Subscription;
  myControl = new FormControl();
  inputValue: string = '';

  constructor(
    private router: Router,
    private taskChangeService: TaskChangeService,
    private taskApiService: TaskApiService,
    private subtaskApiService: SubtaskApiService,
    private datePipe: DatePipe,
    private signalrService: HubConnectionService,
    private userApiService: UserApiService
  ) {
    this.subscription = this.taskChangeService
      .getEvent()
      .subscribe((param: any) => {
        if (param !== undefined) {
          switch (param.action) {
            case 'taskStatusChange':
              this.onCheckClick(param.id);
              param = undefined;
              break;
            case 'delete':
              this.onTaskDelete(param.id);
              param = undefined;
              break;
            case 'edit':
              this.editTask(param);
              break;
            case 'subtaskDelete':
              this.deleteSubtask(param.id);
              break;
            case 'subtaskStatusUpdate':
              this.statusUpdateSubtask(param.id);
              break;
            case 'updatePage':
              this.updatePage();
              break;
            default:
              console.log('Unknown action!');
          }
        }
      });
  }

  ngOnInit(): void {
    this.signalrService.onDataUpdate(this.updatePage.bind(this));
    this.updatePage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updatePage(): void {
    let sub = this.subtaskApiService.getSubtasks().subscribe((res) => {
      this.subtasks = <Subtask[]>res;
      localStorage.setItem('subtasks', JSON.stringify(this.subtasks));
      sub.unsubscribe();
      let sub2 = this.taskApiService.getTasks().subscribe((res) => {
        this.tasks = <Task[]>res;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.updateTitle(`New task #${this.tasks.length + 1}`);
        this.updateFilter();
        sub2.unsubscribe();
      });
    });

    let apiSub = this.userApiService.getUsers().subscribe((res) => {
      this.users = <User[]>(<unknown>res);
      localStorage.setItem('users', JSON.stringify(this.users));
      let apiSub2 = this.userApiService.getCurrentUser().subscribe((res) => {
        if (res) {
          this.currentUser = <User>res;
          this.selectedUser = this.currentUser;

          this.filteredUsers = this.users.filter(
            (u) => u.id !== this.selectedUser.id
          );
        }
        apiSub2.unsubscribe();
      });

      apiSub.unsubscribe();
    });
  }

  onSelect(userId: number): void {
    this.selectedUser = this.users.filter((u) => u.id === userId)[0];
    this.filteredUsers = this.users.filter((u) => u.id !== userId);
  }

  updateFilter() {
    let filterFromLocalStorage = localStorage.getItem('filter');
    if (
      filterFromLocalStorage !== '' &&
      filterFromLocalStorage !== null &&
      filterFromLocalStorage !== 'undefined'
    ) {
      switch (filterFromLocalStorage) {
        case 'all':
          this.filter = TaskFilterValue.all;
          break;
        case 'unfinished':
          this.filter = TaskFilterValue.unfinished;
          break;
        case 'completed':
          this.filter = TaskFilterValue.completed;
          break;
        default:
          this.filter = TaskFilterValue.all;
      }
    }
  }

  onFormChange(field: string, value: string): void {
    if (
      this.title === '' ||
      (this.title === `New task #${this.tasks.length + 1}` &&
        this.description === '')
    ) {
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

  onDatePickerChange(event: any) {
    this.datePickerDate = event.value;
    this.dueDate = this.datePipe.transform(event.value, 'yyyy-MM-ddThh:mm:ss');
  }

  updateTitle(title: string = ''): void {
    this.description = '';
    this.title = title;
  }

  onFilterChange(event): void {
    switch (event.value) {
      case 'all':
        this.filter = TaskFilterValue.all;
        break;
      case 'unfinished':
        this.filter = TaskFilterValue.unfinished;
        break;
      case 'completed':
        this.filter = TaskFilterValue.completed;
        break;
      default:
    }
  }

  capitalize(value: string): string {
    let capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    return capitalizedValue;
  }

  modalOpen(id: number) {
    this.modalTaskId = id;
    this.addModalOn = true;
  }

  modalClose() {
    this.addModalOn = false;
    this.updateModalOn = false;
    this.updatePage();
  }

  openUpdateModal(subtaskId: number) {
    this.modalTaskId = this.subtasks.filter(
      (s) => s.id === subtaskId
    )[0].taskId;
    this.targetSubtaskId = subtaskId;
    this.updateModalOn = true;
  }

  // Task service

  addTask(): void {
    if (this.title !== '') {
      let taskToAdd: TaskToAdd = {
        title: this.capitalize(this.title),
        description: this.capitalize(this.description),
        dateDue: this.dueDate,
        userId: this.selectedUser.id,
      };
      let sub = this.taskApiService.addTask(taskToAdd).subscribe((_) => {
        this.signalrService.sendMessage(
          taskToAdd.userId.toString(),
          taskToAdd.title
        );
        this.updatePage();
        if (this.selectedUser.id !== this.currentUser.id) {
          alert(`Task created for user with ID: ${this.selectedUser.id}`);
        }
        sub.unsubscribe();
      });
    } else {
      this.isDisabled = true;
    }
  }

  editTask(params: any): void {
    let sub = this.taskApiService.updateTask(params.task).subscribe((_) => {
      this.updatePage();
      sub.unsubscribe();
    });
  }

  onTaskDelete(taskId: number): void {
    if (taskId != undefined) {
      let sub = this.taskApiService.deleteTask(taskId).subscribe((_) => {
        this.updatePage();
        sub.unsubscribe();
      });
    }
  }

  onCheckClick(taskId: number): void {
    let sub = this.taskApiService.updateStatus(taskId).subscribe((_) => {
      this.updatePage();
      sub.unsubscribe();
    });
  }

  onDetailsClick(index: number): void {
    localStorage.setItem('detailsIndex', JSON.stringify(index));
    this.router.navigate([`task/${this.tasks[index].id}`]);
  }

  // Subtask service

  // Add Subtask located in subtask-modal

  deleteSubtask(subtaskId: number): void {
    if (subtaskId != undefined) {
      let sub = this.subtaskApiService
        .deleteSubtask(subtaskId)
        .subscribe((_) => {
          this.updatePage();
          sub.unsubscribe();
        });
    }
  }

  statusUpdateSubtask(subtaskId: number): void {
    if (subtaskId != undefined) {
      let sub = this.subtaskApiService
        .updateStatusSubtask(subtaskId)
        .subscribe((_) => {
          this.updatePage();
          sub.unsubscribe();
        });
    }
  }
}
