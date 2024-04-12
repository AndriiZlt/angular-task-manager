import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { TaskToAdd } from 'src/app/models/TaskToAdd';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { TaskManagerApiService } from 'src/app/services/task-managerApi.service';

enum TaskFilterValue {
  'all' = 1,
  'unfinished' = 2,
  'completed' = 3,
}

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
    private taskManagerService: TaskManagerService,
    private apiService: TaskManagerApiService
  ) {
    localStorage.setItem('lastUrl', 'home/task-manager');

    this.taskManagerService.getEvent().subscribe((param: any) => {
      if (param !== undefined) {
        switch (param.action) {
          case 'check':
            this.onCheckClick(param.taskId);
            param = undefined;
            break;
          case 'delete':
            this.onTaskDelete(param.taskId);
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
    this.apiService.getTasks().subscribe((data) => {
      console.log('Tasks:', data);
      this.tasks = [...(<Task[]>data)];
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
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
      let taskToAdd: TaskToAdd = {
        title: this.capitalize(this.title),
        description: this.capitalize(this.description),
      };
      this.apiService.addTask(taskToAdd).subscribe((data) => {
        this.updatePage();
      });
    } else {
      this.isDisabled = true;
      alert('Why empty title?!');
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
    this.router.navigate(['home/task-manager/task', this.tasks[index].taskId]);
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
}
