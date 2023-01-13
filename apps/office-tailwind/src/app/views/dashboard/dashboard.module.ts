import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { DashboardTaskComponent } from './components/dashboard-task/dashboard-task.component';
import { DashboardTicketComponent } from './components/dashboard-ticket/dashboard-ticket.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent,
  },
];

@NgModule({
  declarations: [
    DashboardMainComponent,
    DashboardChartComponent,
    DashboardTaskComponent,
    DashboardTicketComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class DashboardModule {}
