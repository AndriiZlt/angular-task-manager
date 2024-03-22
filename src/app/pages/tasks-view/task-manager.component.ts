import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from './task/task.component';
import { TaskManagerService } from 'src/app/services/task-manager.service';

enum TaskFilterValue {
  'all' = 1,
  'unfinished' = 2,
  'completed' = 3,
}

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  description: string = '';
  title: string = '';
  filter: TaskFilterValue = TaskFilterValue.all;
  isDisabled: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskManagerService: TaskManagerService
  ) {
    this.taskManagerService.getEvent().subscribe((param: any) => {
      if (param !== undefined) {
        switch (param.action) {
          case 'check':
            this.onCheckClick(param.index);
            param = undefined;
            break;
          case 'delete':
            this.onTaskDelete(param.index);
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
    this.getDataFromLocalStorage();
  }

  onChange(field: string, value: string): void {
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

  addTask(): void {
    if (this.title !== '') {
      this.tasks.push({
        id: Date.now(),
        title: this.capitalize(this.title),
        description: this.capitalize(this.description),
        completed: false,
      });
      this.description = '';
      this.title = `New task #${this.tasks.length + 1}`;
      console.log(this.tasks);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      this.isDisabled = true;
      console.log('No empty title!');
    }
  }

  editTask(params: any) {
    if (this.tasks[0]) {
      this.tasks[params.index].title = params.title;
      this.tasks[params.index].description = params.description;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  onTaskDelete(index: number): void {
    if (index != undefined && this.tasks.length > 0) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  onCheckClick(index): void {
    if (index != undefined && this.tasks.length > 0) {
      this.tasks[index].completed = !this.tasks[index].completed;

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  onDetailsClick(index: number): void {
    localStorage.setItem('detailsIndex', JSON.stringify(index));
    this.router.navigate(['home/task-manager/task', this.tasks[index].id]);
  }

  clearInput(): void {
    this.description = '';
    this.title = '';
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

  getDataFromLocalStorage(): void {
    let filterFromLocalStorage = localStorage.getItem('filter');
    if (
      filterFromLocalStorage !== '' &&
      filterFromLocalStorage !== null &&
      filterFromLocalStorage !== 'undefined'
    ) {
      this.filter = JSON.parse(filterFromLocalStorage);
    }

    let dataFromStrage = localStorage.getItem('tasks');

    if (
      dataFromStrage !== '' &&
      dataFromStrage !== null &&
      typeof dataFromStrage !== 'undefined'
    ) {
      this.tasks = [...JSON.parse(dataFromStrage)];
    }

    this.title = `New task #${this.tasks.length + 1}`;
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
}
