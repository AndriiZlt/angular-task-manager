import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Task } from 'src/app/models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  task: Task;
  isChecked: boolean;
  taskIndex: number = -1;
  taskId: number = null;
  isDisabled: boolean = true;
  height: string;

  @Output() onTaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onTaskCheckClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskManagerService: TaskManagerService
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.params.id);
    this.getFromLocalStorage();
    localStorage.setItem('lastUrl', `task-manager/task/${this.taskId}`);
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

  resetPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
  }

  deleteHandler(index: number): void {
    this.taskManagerService.triggerEvent({
      action: 'delete',
      taskId: this.task.taskId,
    });
    this.router.navigate(['home/task-manager']);
  }

  getFromLocalStorage(): void {
    this.taskIndex = JSON.parse(localStorage.getItem('detailsIndex'));
    let tasksFromLC = localStorage.getItem('tasks');
    if (
      tasksFromLC !== '' &&
      tasksFromLC !== null &&
      tasksFromLC !== 'undefined'
    ) {
      this.task = JSON.parse(tasksFromLC).filter(
        (task: Task) => task.taskId === this.taskId
      )[0];

      console.log('Task(detailed):', this.task);

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

  onEdit(field: string, value: string) {
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
