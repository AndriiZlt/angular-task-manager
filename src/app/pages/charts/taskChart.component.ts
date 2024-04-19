import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Subtask } from 'src/app/models/Subtask';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task-chart',
  templateUrl: './taskChart.component.html',
  styleUrls: ['./taskChart.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TaskChartComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() subtasks: Subtask[];
  chart = [];
  labels: string[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    var dates = this.tasks.map((task) => {
      this.labels.push(task.dateCreated);
    });

    console.log('tasks in chart:', this.tasks);
    console.log('dates for chart', dates);

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        datasets: [
          {
            label: 'Tasks',
            data: [1, 3, 5, 10, 56, 65, 35, 543, 543, 543],
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Subtasks',
            data: [1, 3, 5, 10, 56, 65, 35, 543, 543, 543],
            backgroundColor: 'blue',
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
    });
  }

  resetPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    });
  }
}
