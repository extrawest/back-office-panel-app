import { Component, OnDestroy } from '@angular/core';
import { EChartsOption } from 'echarts';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'office-app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
})
export class DashboardChartComponent implements OnDestroy {
  public graphData: any[] = [];
  public componentDestroyed$: Subject<void> = new Subject();
  public chartOption: EChartsOption;
  constructor(private userService: UserService) {
    this.userService.addGraphData().subscribe({
      complete: () => {
        this.getGraphData();
      },
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  private getGraphData() {
    this.userService
      .getGraphData()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((result: any[]) => {
        if (!result) {
          return;
        }
        this.graphData = [...Object.values(result)].reverse();
        this.chartOption = {
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
              data: this.graphData[0]['graphData'],
              type: 'line',
              areaStyle: {},
              colorBy: 'data',
            },
          ],
        };
      });
  }
}
