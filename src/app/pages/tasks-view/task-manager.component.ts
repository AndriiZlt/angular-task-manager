import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { TaskToAdd } from 'src/app/models/TaskToAdd';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { TaskManagerApiService } from 'src/app/services/task-managerApi.service';
import { DatePipe } from '@angular/common';
import { Subtask } from 'src/app/models/Subtask';

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

  filter: TaskFilterValue = TaskFilterValue.all;
  isDisabled: boolean = true;
  isModalOn: boolean = false;
  modalTaskId: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskManagerService: TaskManagerService,
    private apiService: TaskManagerApiService,
    private datePipe: DatePipe
  ) {
    localStorage.setItem('lastUrl', 'home/task-manager');

    this.taskManagerService.getEvent().subscribe((param: any) => {
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
        }
      }
    });
  }

  ngOnInit(): void {
    this.updatePage();
  }

  updatePage(): void {
    this.apiService.getSubtasks().subscribe((data) => {
      console.log('data after fetch', data);
      this.subtasks = [...(<Subtask[]>data)];
      console.log('Subtasks:', this.subtasks);
    });

    this.apiService.getTasks().subscribe((data) => {
      this.tasks = [...(<Task[]>data)];
      this.updateInput(`New task #${this.tasks.length + 1}`);
      this.updateFilter();

      console.log('Tasks:', this.tasks);
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
        break;
    }
  }

  onDatePickerChange(event: any) {
    this.datePickerDate = event.value;
    this.dueDate = this.datePipe.transform(event.value, 'yyyy-MM-ddThh:mm:ss');
  }

  addTask(): void {
    if (this.title !== '') {
      let taskToAdd: TaskToAdd = {
        title: this.capitalize(this.title),
        description: this.capitalize(this.description),
        dateDue: this.dueDate,
      };
      this.apiService.addTask(taskToAdd).subscribe((data) => {
        this.updatePage();
      });
    } else {
      this.isDisabled = true;
    }
  }

  editTask(params: any): void {
    this.apiService.updateTask(params.task).subscribe((data) => {
      this.updatePage();
    });
  }

  onTaskDelete(taskId: number): void {
    if (taskId != undefined) {
      this.apiService.deleteTask(taskId).subscribe((data) => {
        this.updatePage();
      });
    }
  }

  onCheckClick(taskId: number): void {
    if (taskId !== undefined) {
      this.apiService.updateStatus(taskId).subscribe((data) => {
        this.updatePage();
      });
    }
  }

  onDetailsClick(index: number): void {
    localStorage.setItem('detailsIndex', JSON.stringify(index));
    this.router.navigate(['home/task-manager/task', this.tasks[index].id]);
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
    this.isModalOn = true;
  }

  modalClose() {
    this.isModalOn = false;
    this.updatePage();
  }
}
