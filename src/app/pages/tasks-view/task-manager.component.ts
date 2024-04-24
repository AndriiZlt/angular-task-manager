import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/Task.nodel';
import { TaskToAdd } from 'src/app/models/TaskToAdd.model';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { TaskManagerApiService } from 'src/app/services/task-managerApi.service';
import { DatePipe } from '@angular/common';
import { Subtask } from 'src/app/models/Subtask.model';
import { HttpClient } from '@angular/common/http';

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
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  subtasks: Subtask[] = [];
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskManagerService: TaskManagerService,
    private apiService: TaskManagerApiService,
    private datePipe: DatePipe
  ) {
    localStorage.setItem('lastUrl', 'home/task-manager');

    this.taskManagerService.getEvent().subscribe((param: any) => {
      // console.log('param:', param);
      if (param !== undefined) {
        switch (param.action) {
          case 'check':
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
    this.updatePage();
  }

  updatePage(): void {
    this.apiService.getSubtasks().subscribe((data) => {
      this.subtasks = <Subtask[]>data;
      localStorage.setItem('subtasks', JSON.stringify(this.subtasks));
      console.log('Subtasks:', this.subtasks);

      this.apiService.getTasks().subscribe((data) => {
        this.tasks = [...(<Task[]>data)];
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        console.log('Tasks:', this.tasks);
      });
      this.updateInput(`New task #${this.tasks.length + 1}`);
      this.updateFilter();
    });
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
        console.log('description:', this.description);
        break;
    }
  }

  onDatePickerChange(event: any) {
    this.datePickerDate = event.value;
    this.dueDate = this.datePipe.transform(event.value, 'yyyy-MM-ddThh:mm:ss');
  }

  updateInput(title: string = ''): void {
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

  resetPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
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
      };
      this.apiService.addTask(taskToAdd).subscribe((_) => {
        this.updatePage();
      });
    } else {
      this.isDisabled = true;
    }
  }

  editTask(params: any): void {
    this.apiService.updateTask(params.task).subscribe((_) => {
      this.updatePage();
    });
  }

  onTaskDelete(taskId: number): void {
    if (taskId != undefined) {
      this.apiService.deleteTask(taskId).subscribe((_) => {
        this.updatePage();
      });
    }
  }

  onCheckClick(taskId: number): void {
    if (taskId !== undefined) {
      this.apiService.updateStatus(taskId).subscribe((_) => {
        this.updatePage();
      });
    }
  }

  onDetailsClick(index: number): void {
    localStorage.setItem('detailsIndex', JSON.stringify(index));
    this.router.navigate(['home/task-manager/task', this.tasks[index].id]);
  }

  // Subtask service

  // Add Subtask located in subtask-modal
  addSubtask(subtask: Subtask) {}

  deleteSubtask(subtaskId: number): void {
    if (subtaskId != undefined) {
      this.apiService.deleteSubtask(subtaskId).subscribe((_) => {
        this.updatePage();
      });
    }
  }

  statusUpdateSubtask(subtaskId: number): void {
    if (subtaskId != undefined) {
      this.apiService.updateStatusSubtask(subtaskId).subscribe((_) => {
        this.updatePage();
      });
    }
  }
}
