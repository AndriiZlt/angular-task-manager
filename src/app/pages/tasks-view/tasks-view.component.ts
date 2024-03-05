import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/app.component';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksViewComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  tasks: Task[] = [];
  inputValue: string = '';
  filter: string = 'all';
  index: number = -1;
  detailedViewIndex: number = -1;
  ngOnInit(): void {
    this.getDataFromLocalStorage();
  }

  addTask() {
    this.tasks.push({
      id: this.tasks.length + 1,
      description: this.inputValue,
      completed: false,
    });
    this.inputValue = '';
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  onTaskDelete(selectedIndex: number): void {
    this.tasks.splice(selectedIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.detailedViewIndex = -1;
    localStorage.setItem(
      'taskViewIndex',
      JSON.stringify(this.detailedViewIndex)
    );
  }

  onTaskCheckClick(selectedIndex: number): void {
    this.tasks[selectedIndex].completed = !this.tasks[selectedIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem(
      'taskViewIndex',
      JSON.stringify(this.detailedViewIndex)
    );
    this.resetPage();
  }

  onDetailsClick(index: number): void {
    console.log('On details click fun', index);
    this.detailedViewIndex = index;
    localStorage.setItem(
      'detailsTaskIndex',
      JSON.stringify(this.detailedViewIndex)
    );
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

  getDataFromLocalStorage() {
    let filterFromLocalStorage = localStorage.getItem('filter');
    if (
      filterFromLocalStorage != '' &&
      filterFromLocalStorage != null &&
      filterFromLocalStorage != 'undefined'
    ) {
      this.filter = JSON.parse(filterFromLocalStorage);
    }

    let dataFromStrage = localStorage.getItem('tasks');

    if (
      dataFromStrage != '' &&
      dataFromStrage != null &&
      typeof dataFromStrage != 'undefined'
    ) {
      this.tasks = JSON.parse(dataFromStrage);
    }

    let detailViewIndexFromLocalStorage =
      localStorage.getItem('detailsTaskIndex');
    if (
      detailViewIndexFromLocalStorage != '' &&
      detailViewIndexFromLocalStorage != null &&
      detailViewIndexFromLocalStorage != 'undefined'
    ) {
      this.detailedViewIndex = JSON.parse(detailViewIndexFromLocalStorage);
    }
  }

  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
  }
}
