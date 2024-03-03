import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Task } from 'src/app/app.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewComponent implements OnInit {
  constructor() {}
  @Input() tasks: Task[];
  @Input() index: number;
  @Output() onTaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onTaskCheckClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    // console.log(this.index);
    // console.log(this.tasks[this.index]);
  }
}
