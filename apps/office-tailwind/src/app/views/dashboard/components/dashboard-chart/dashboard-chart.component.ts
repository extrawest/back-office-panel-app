import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'office-app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css'],
})
export class DashboardChartComponent {
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'todayData',
        data: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650, 1680],
        type: 'line',
        areaStyle: {},
        colorBy: 'data',
      },
      {
        name: 'yesterdayData',
        data: [620, 932, 1301, 1334, 1590, 830, 650, 800, 765, 680],
        type: 'line',
        areaStyle: {},
      },
    ],
  };
  barChartcustomColors = [
    { name: '1', value: '#febb00' },
    { name: '2', value: '#1dd068' },
    { name: '3', value: '#1dd068' },
    { name: '4', value: '#febb00' },
  ];
  constructor() {}
}
