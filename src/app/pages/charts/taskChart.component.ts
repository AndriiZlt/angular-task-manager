import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subtask } from 'src/app/models/Subtask';
import { Task } from 'src/app/models/Task';
import { TaskManagerApiService } from 'src/app/services/task-managerApi.service';

@Component({
  selector: 'app-task-chart',
  templateUrl: './taskChart.component.html',
  styleUrls: ['./taskChart.component.scss'],
})
export class TaskChartComponent implements OnInit {
  @Input() tasks: Task[];
  @Input() subtasks: Subtask[];

  chart: Chart;
  labels: string[];
  dataset1: number[] = [];
  dataset2: number[] = [];

  constructor(private apiService: TaskManagerApiService) {
  }

  ngOnChanges(changes: SimpleChange) {
    // if (changes['tasks']) {
    //   console.log("changes['tasks']", changes['tasks'].currentValue);
    //   this.tasks = changes['tasks'].currentValue;
    //   console.log('tasks after change', this.tasks);
    // }
    // if (changes['subtasks']) {
    //   console.log(2);
    //   this.subtasks = changes['subtasks'].currentValue;
    //   console.log('subtasks after change', this.subtasks);
    // }
    // this.updateChart();
  }

  ngOnInit(): void {
    this.updatePage();
    // console.log('dates for chart', this.labels);
  }

  updatePage(): void {
    this.apiService.getSubtasks().subscribe((data) => {
      this.subtasks = [...(<Subtask[]>data)];
    });

    this.apiService.getTasks().subscribe((data) => {
      this.tasks = [...(<Task[]>data)];
      this.updateChart();
    });
  }

  shortenOneDate(dateToShorten: string): string {
    if (dateToShorten) {
      let date = new Date(dateToShorten);
      let transformedDate: string =
        date.getDate().toString() +
        '-0' +
        (date.getMonth() + 1).toString() +
        '-' +
        date.getFullYear().toString();
      return transformedDate;
    } else {
      return dateToShorten;
    }
  }

  shortenAllDates() {
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].dateCreated = this.shortenOneDate(
        this.tasks[i].dateCreated
      );

      this.tasks[i].dateCompleted = this.shortenOneDate(
        this.tasks[i].dateCompleted
      );

      this.tasks[i].dateDue = this.shortenOneDate(this.tasks[i].dateDue);
    }

    for (let i = 0; i < this.subtasks.length; i++) {
      this.subtasks[i].dateCreated = this.shortenOneDate(
        this.subtasks[i].dateCreated
      );

      this.subtasks[i].dateCompleted = this.shortenOneDate(
        this.subtasks[i].dateCompleted
      );
    }
  }

  updateLabels(): string[] {
    this.shortenAllDates(); // Make all dates in Tasks and Subtasks short

    // Take only dates to one string[]
    let shortDates: string[] = this.tasks
      .map((t) => t.dateCreated)
      .concat(this.subtasks.map((t) => t.dateCreated))
      .concat(this.tasks.map((t) => t.dateCompleted))
      .concat(this.subtasks.map((t) => t.dateCompleted))
      .filter((s) => s != null);

    // Only unique dates
    let unique_values = shortDates.filter(
      (value, index, current_value) => current_value.indexOf(value) === index
    );
    console.log(
      'unique_values',
      unique_values.filter((v) => v != null)
    );

    // Sorting before return
    return unique_values.filter((v) => v != null).sort();
  }

  updateChart() {
    let labels = this.updateLabels();
    // console.log('labels:', labels);
    // console.log('tasksss', this.tasks);
    // console.log('subtasksss', this.subtasks);
    labels.map((label) => {
      let count1 = this.tasks.filter((t) => t.dateCreated === label).length;
      this.dataset1.push(count1);
      let count2 = this.subtasks.filter((s) => s.dateCreated === label).length;
      this.dataset2.push(count2);
    });

    // console.log('Dataset1:', this.dataset1, 'Dataset2:', this.dataset2);

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Tasks',
            data: this.dataset1,
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Subtasks',
            data: this.dataset2,
            backgroundColor: 'blue',
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
    });
  }
}
