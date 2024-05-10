import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alpaca',
  templateUrl: './alpaca-app.component.html',
  styleUrls: ['./alpaca-app.component.scss'],
})
export class AlpacaAppComponent implements OnInit {
  currentView: string = 'trading';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onViewChange(event) {
    if (event.target.innerHTML.toLowerCase() === 'task-manager') {
      this.router.navigate(['home/task-manager']);
      return;
    }
    this.currentView = event.target.innerHTML.toLowerCase();
    console.log('event:', event.target.innerHTML);
    this.router.navigate([`alpaca/${this.currentView}`]);
  }
}
