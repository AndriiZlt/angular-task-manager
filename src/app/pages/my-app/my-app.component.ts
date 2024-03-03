import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/app.component';

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.scss'],
})
export class MyAppComponent implements OnInit {
  changeFlag: boolean = false;
  tasks: Task[] = [];
  taskViewIndex: number = -1;
  title = 'angular-task-manager';
  filter: string = 'all';
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getDataFromLocalStorage();
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

    let detailViewIndexFromLocalStorage = localStorage.getItem('taskViewIndex');
    if (
      detailViewIndexFromLocalStorage != '' &&
      detailViewIndexFromLocalStorage != null &&
      detailViewIndexFromLocalStorage != 'undefined'
    ) {
      this.taskViewIndex = JSON.parse(detailViewIndexFromLocalStorage);
    }
  }

  onTaskDelete(selectedIndex: number): void {
    this.tasks.splice(selectedIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.taskViewIndex = -1;
    localStorage.setItem('taskViewIndex', JSON.stringify(this.taskViewIndex));
  }

  onTaskCheckClick(selectedIndex: number): void {
    this.tasks[selectedIndex].completed = !this.tasks[selectedIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('taskViewIndex', JSON.stringify(this.taskViewIndex));
    this.resetPage();
  }
  onDetailsClick(index): void {
    this.taskViewIndex = index;
    localStorage.setItem('taskViewIndex', JSON.stringify(this.taskViewIndex));
  }
  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
  }
}
