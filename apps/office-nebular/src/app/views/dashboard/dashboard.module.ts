import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardTaskComponent } from './components/dashboard-task/dashboard-task.component';
import { DashboardTicketComponent } from './components/dashboard-ticket/dashboard-ticket.component';
import {
  NbIconModule,
  NbCardModule,
  NbThemeModule,
  NbCheckboxModule,
} from '@nebular/theme';

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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NbIconModule,
    NbCardModule,
    NbThemeModule,
    NbCheckboxModule,
  ],
})
export class DashboardModule {}
