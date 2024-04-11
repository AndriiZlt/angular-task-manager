import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { TaskManagerService } from 'src/app/services/task-manager.service';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskManagerService: TaskManagerService
  ) {}

  @Input() task: Task;
  @Input() taskIndex: number;
  @Output() onTaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDetailsClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}

  onCheckClick(index: number): void {
    this.taskManagerService.triggerEvent({ action: 'check', index });
  }

  onCardClick(index: number): void {
    this.onDetailsClick.emit(index);
  }
}
