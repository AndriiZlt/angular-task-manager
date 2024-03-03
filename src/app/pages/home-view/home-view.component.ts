import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/app.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Output() onSetLocalStorage: EventEmitter<any> = new EventEmitter<any>();
  @Output() onTaskDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onTaskCheckClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDetailsClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() tasks: Task[];
  inputValue: string = '';
  @Input() filter: string = 'all';

  ngOnInit(): void {}

  addTask() {
    this.tasks.push({
      id: this.tasks.length + 1,
      description: this.inputValue,
      completed: false,
    });
    this.inputValue = '';
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  clearInput() {
    this.inputValue = '';
  }

  onFilterChange(event) {
    switch (event.value) {
      case 'all':
        this.filter = 'all';
        break;
      case 'unfinished':
        this.filter = 'unfinished';
        break;
      case 'completed':
        this.filter = 'completed';
        break;
      default:
    }
  }
}
