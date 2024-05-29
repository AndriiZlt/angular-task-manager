import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { AlpacaService } from '../../services/alpaca.service';
import { FormControl } from '@angular/forms';
import { Asset } from '../../models/Asset.model';

@Component({
  selector: 'app-alpaca-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  chart: Chart;
  chartIsReady: boolean = false;
  labels: string[];
  assets: Asset[] = [];
  filteredAssets: string[] = [];
  selectedStock: string = 'AAPL';
  selectedAsset: Asset;
  myControl = new FormControl();
  inputValue: string = '';
  buttonDisabled: boolean = true;
  selectedPrice: number;
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
    this.dateToISO();
    this.alpacaService.getAssets().subscribe((data) => {
      for (const item in data) {
        if (this.nasdaq100.includes(data[item].symbol)) {
          this.assets.push(data[item]);
        }

        //   //this.assets.push(data[item]); //All
      }
      this.filteredAssets = this.assets.map((asset) => asset.name);
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chartIsReady = false;
    }
  }

  clearSelect(): void {
    this.inputValue = '';
    this.selectedPrice = null;
    this.selectedAsset = null;
    this.buttonDisabled = true;
    this.filteredAssets = this.assets.map((asset) => asset.name);
  }

  onInputChange(inputValue: string): void {
    this.inputValue = inputValue;
    this.filteredAssets = this.assets
      .filter(
        (a) =>
          a.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          a.symbol.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((asset) => asset.name);
  }

  onSelectionChange(event: any): void {
    this.selectedAsset = this.assets.filter(
      (a) => a.name == event.option.value
    )[0];
    console.log('selected asset:', this.selectedAsset);
    this.selectedStock = this.selectedAsset['symbol'];
    this.updateChart();
    // this.inputValue = event;
    this.buttonDisabled = false;

    this.alpacaService
      .getLastTrades(this.selectedAsset['symbol'])
      .subscribe((res) => {
        this.selectedPrice = Number(parseFloat(res['trade'].p).toFixed(2));
      });
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chartIsReady = false;
    }
    this.alpacaService.getAssetData(this.selectedStock).subscribe((data) => {
      this.createChart(data['bars']);
    });
  }

  dateToISO() {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);
  }

  createChart(bars): void {
    let labels = bars.map((d) => {
      return (
        d.t.substring(8, 10) +
        '-' +
        d.t.substring(5, 7) +
        '-' +
        d.t.substring(0, 4)
      );
    });

    let data = {
      labels: labels,
      datasets: [
        {
          label: 'Last month bars',
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
        },
      ],
    };

    const candlestick = {
      id: 'candlestick',
      beforeDatasetsDraw(chart) {
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
    this.chartIsReady = true;
    this.chart = new Chart(document.getElementById('canvas'), config);
  }
}
