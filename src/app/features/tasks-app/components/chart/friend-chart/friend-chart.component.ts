import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import Chart from 'chart.js/auto';
import { Friend } from 'src/app/features/friends-app/models/Friend.model';
import { TaskManagerApiService } from '../../../services/task.service';

@Component({
  selector: 'friend-chart',
  templateUrl: './friend-chart.component.html',
  styleUrls: ['./friend-chart.component.scss'],
})
export class FriendChartComponent implements OnInit {
  @Input() friends: Friend[];

  chart: Chart;
  labels: string[];
  dataset1: number[] = [];

  constructor(private apiService: TaskManagerApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChange) {
    if (changes['friends']) {
      this.friends = changes['friends'].currentValue;
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
            label: 'Friends by AGE',
            data: this.dataset1,
            backgroundColor: 'red',
            borderColor: 'red',
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

  updateLabels(): void {
    let ages: string[] = this.friends
      .map((f) => f.age.toString())
      .filter((s) => s != null);

    // Only unique dates
    let unique_values = ages.filter(
      (value, index, current_value) => current_value.indexOf(value) === index
    );
    this.labels = unique_values.filter((v) => v != null).sort();
  }

  updateDatasets() {
    let dataset1 = [];
    this.labels.map((label) => {
      let count1 = this.friends.filter(
        (t) => t.age.toString() === label
      ).length;
      dataset1.push(count1);
    });
    this.dataset1 = [...dataset1];
  }
}
