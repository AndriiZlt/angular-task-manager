import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subtask } from '../../../models/Subtask.model';
import { Task } from '../../../models/Task.model';
import { TaskManagerApiService } from '../../../services/task.service';

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

  constructor(private apiService: TaskManagerApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChange) {
    if (changes['tasks']) {
      this.tasks = changes['tasks'].currentValue;
    }
    if (changes['subtasks']) {
      this.subtasks = changes['subtasks'].currentValue;
    }
    this.updateChart();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }

  updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.updateLabels();
    this.updateDatasets();
    var canvas = document.getElementById('canvas');

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.labels,
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

  shortenOneDate(dateToShorten: string): string {
    if (
      dateToShorten === null ||
      (dateToShorten != null && dateToShorten.length < 11)
    ) {
      return dateToShorten;
    }

    let date = new Date(dateToShorten);
    let transformedDate: string =
      date.getDate().toString() +
      '-0' +
      (date.getMonth() + 1).toString() +
      '-' +
      date.getFullYear().toString();
    return transformedDate;
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

  updateLabels(): void {
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

    // Sorting before updateting labels
    this.labels = unique_values.filter((v) => v != null).sort();
  }

  updateDatasets() {
    let dataset1 = [];
    let dataset2 = [];
    this.labels.map((label) => {
      let count1 = this.tasks.filter((t) => t.dateCreated === label).length;
      dataset1.push(count1);
      let count2 = this.subtasks.filter((s) => s.dateCreated === label).length;
      dataset2.push(count2);
    });
    this.dataset1 = [...dataset1];
    this.dataset2 = [...dataset2];
  }
}
