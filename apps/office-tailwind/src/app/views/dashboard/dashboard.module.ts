import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { DashboardTaskComponent } from './components/dashboard-task/dashboard-task.component';
import { DashboardTicketComponent } from './components/dashboard-ticket/dashboard-ticket.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule, Routes } from '@angular/router';
import { DashboardTaskDialogComponent } from './components/dashboard-task-dialog/dashboard-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardTicketDialogComponent } from './components/dashboard-ticket-dialog/dashboard-ticket-dialog.component';

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
    DashboardTaskDialogComponent,
    DashboardTicketDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class DashboardModule {}
