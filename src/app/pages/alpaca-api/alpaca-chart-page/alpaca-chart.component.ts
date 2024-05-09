import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { AlpacaService } from 'src/app/services/alpaca.service';
// import {CandlestickElement} from "chart.js/types"

@Component({
  selector: 'app-alpaca-chart',
  templateUrl: './alpaca-chart.component.html',
  styleUrls: ['./alpaca-chart.component.scss'],
})
export class AlpacaChartComponent implements OnInit {
  chart: Chart;
  labels: string[];
  dataset1: number[] = [];
  dataset2: number[] = [];
  rootURL = 'https://data.alpaca.markets';
  assets: string[] = [];
  selectedStock: string = 'AAPL';
  nasdaq100: string[] = [
    'AAPL',
    'ABNB',
    'ADBE',
    'ADI',
    'ADP',
    'ADSK',
    'AEP',
    'AMAT',
    'AMD',
    'AMGN',
    'AMZN',
    'ANSS',
    'ASML',
    'AVGO',
    'AZN',
    'BIIB',
    'BKNG',
    'BKR',
    'CCEP',
    'CDNS',
    'CDW',
    'CEG',
    'CHTR',
    'CMCSA',
    'COST',
    'CPRT',
    'CRWD',
    'CSCO',
    'CSGP',
    'CSX',
    'CTAS',
    'CTSH',
    'DASH',
    'DDOG',
    'DLTR',
    'DXC',
    'EA',
    'EXC',
    'FANG',
    'FAST',
    'FTNT',
    'GEHC',
    'GFS',
    'GILD',
    'GOOG',
    'GOOGL',
    'HON',
    'IDXX',
    'ILMN',
    'INTC',
    'INTU',
    'ISRG',
    'KDP',
    'KHC',
    'KLAC',
    'LIN',
    'LRCX',
    'LULU',
    'MAR',
    'MCHP',
    'MDB',
    'MDLZ',
    'MELI',
    'META',
    'MNST',
    'MRNA',
    'MRVL',
    'MSFT',
    'MU',
    'NFLX',
    'NVDA',
    'NXPI',
    'ODFL',
    'ON',
    'ORLY',
    'PANW',
    'PAYX',
    'PCAR',
    'PDD',
    'PEP',
    'PYPL',
    'QCOM',
    'REGN',
    'ROP',
    'ROST',
    'SBUX',
    'SIRI',
    'SNPS',
    'TEAM',
    'TMUS',
    'TSLA',
    'TTD',
    'TTWO',
    'TXN',
    'VRSK',
    'VRTX',
    'WBA',
    'WBD',
    'WDAY',
    'XEL',
    'ZS',
  ];

  constructor(private http: HttpClient, private alpacaService: AlpacaService) {}

  ngOnInit(): void {
    this.updateChart();
  }

  onSelect(event):void {
    this.selectedStock = event;
    this.updateChart();
  }

  // getAssets() {
  //   return this.http.get('https://api.alpaca.markets/v2/assets', {
  //     headers: this.headers,
  //   });

  // this.getAssets().subscribe((data) => {
  //   for (const item in data) {
  //     if (data[item].exchange == 'NASDAQ') {
  //       this.assets.push(data[item]);
  //     }
  //   }
  // });
  // }

  updateChart():void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.alpacaService.getAssetData(this.selectedStock).subscribe((data) => {
      this.createChart(data['bars']);
      console.log('Bars:', this.selectedStock, data['bars']);
    });
  }

  createChart(bars):void {
    let data = {
      labels: bars.map((d) => d.t),
      datasets: [
        {
          label: 'Financial Graph',
          data: bars.map(({ c, h, l, o, t }) => {
            return {
              x: new Date(t), //date
              o: o, //open price
              h: h, //hight price
              l: l, //low price
              c: c, //close price
              s: [o, c],
            };
          }),
          color: {
            up: 'rgb(26, 152, 129)', // those colors are better than defaults
            down: 'rgb(239, 57, 74)', // those colors are better than defaults
            unchanged: '#999', // those colors are better than defaults
          },
          borderColor: {
            up: 'rgb(26, 152, 129)',
            down: 'rgb(239, 57, 74)',
            unchanged: '#999',
          },
          backgroundColor: bars.map(({ o, c }) => {
            return o < c ? 'rgb(26, 152, 129)' : 'rgb(239, 57, 74)'; // for better presentation
          }),
          barPercentage: 0.5,
          // borderWidth: 1,
          // borderSkipped: false,
        },
      ],
    };

    const candlestick = {
      id: 'candlestick',
      beforeDatasetsDraw(chart, args, pluginOptions) {
        const {
          ctx,
          data,
          chartArea: { top, bottom, left, right, width, height },
          scales: { x, y },
        } = chart;
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0,0,0,1)';

        data.datasets[0].data.forEach((datapoint, index) => {
          // Upper cabdle
          ctx.beginPath();
          ctx.moveTo(
            chart.getDatasetMeta(0).data[index].x,
            chart.getDatasetMeta(0).data[index].y
          );
          ctx.lineTo(
            chart.getDatasetMeta(0).data[index].x,
            y.getPixelForValue(data.datasets[0].data[index].h)
          );
          ctx.stroke();
          //Bottom candle
          ctx.beginPath();
          ctx.moveTo(
            chart.getDatasetMeta(0).data[index].x,
            chart.getDatasetMeta(0).data[index].y
          );
          ctx.lineTo(
            chart.getDatasetMeta(0).data[index].x,
            y.getPixelForValue(data.datasets[0].data[index].l)
          );
          ctx.stroke();
        });
      },
    };

    const config = {
      type: 'bar',
      data,
      options: {
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 's',
        },
        responsive: true,
        animation: false,
        scales: {
          x: {},
          y: {
            beginAtZero: false,
            grace: 1,
          },
        },
      },
      plugins: [candlestick],
    };

    this.chart = new Chart(document.getElementById('canvas'), config);
  }
}