import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/app.component';

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.scss'],
})
export class MyAppComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  view: string = 'task-manager';

  ngOnInit(): void {
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage() {
    let viewFromLocalStorage = localStorage.getItem('view');
    if (
      viewFromLocalStorage != '' &&
      viewFromLocalStorage != null &&
      viewFromLocalStorage != 'undefined'
    ) {
      this.view = viewFromLocalStorage;
    }
  }

  onViewChange(event) {
    this.view = event.target.id;
    localStorage.setItem('view', this.view);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
