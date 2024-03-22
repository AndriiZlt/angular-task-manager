import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Task } from '../task/task.component';
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
  index: number = -1;
  id: number = null;
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
    this.id = Number(this.route.snapshot.params.id);
    this.getFromLocalStorage();
  }

  checkHandler(index: number): void {
    this.taskManagerService.triggerEvent({ action: 'check', index });
    this.task.completed = !this.task.completed;
    this.isChecked = this.task.completed;
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
    this.taskManagerService.triggerEvent({ action: 'delete', index });
    this.router.navigate(['/task-manager']);
  }

  getFromLocalStorage(): void {
    this.index = JSON.parse(localStorage.getItem('detailsIndex'));
    let tasksFromLC = localStorage.getItem('tasks');
    // console.log('Details init: tasks from LC', JSON.parse(tasksFromLC));
    if (
      tasksFromLC !== '' &&
      tasksFromLC !== null &&
      tasksFromLC !== 'undefined'
    ) {
      this.task = JSON.parse(tasksFromLC).filter(
        (task) => task.id === this.id
      )[0];
      // console.log('task=>', this.task);
      this.isChecked = this.task.completed;
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
    }
    // let capitalized = input.charAt(0).toUpperCase() + input.slice(1);
  }

  capitalize(value: string): string {
    let capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    return capitalizedValue;
  }

  saveHandler(): void {
    if (this.task.title !== '') {
      let index = Number(this.index);
      this.taskManagerService.triggerEvent({
        index,
        action: 'edit',
        title: this.task.title,
        description: this.task.description,
      });
      this.back();
    } else {
      console.log('No empty title!');
    }
  }
}
