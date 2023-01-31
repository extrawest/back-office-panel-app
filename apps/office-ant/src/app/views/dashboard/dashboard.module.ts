import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { DashboardTicketComponent } from './components/dashboard-ticket/dashboard-ticket.component';
import { DashboardTaskComponent } from './components/dashboard-task/dashboard-task.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DashboardTaskDialogComponent } from './components/dashboard-task-dialog/dashboard-task-dialog.component';
import { DashboardTicketDialogComponent } from './components/dashboard-ticket-dialog/dashboard-ticket-dialog.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
    DashboardTicketComponent,
    DashboardTaskComponent,
    DashboardTaskDialogComponent,
    DashboardTicketDialogComponent,
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
    NzGridModule,
    NzDividerModule,
    NzCheckboxModule,
    NzCardModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule,
    NzModalModule,
    NzIconModule
  ],
})
export class DashboardModule {}
