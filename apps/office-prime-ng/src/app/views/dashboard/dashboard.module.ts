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
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardTaskDialogComponent } from './components/dashboard-task-dialog/dashboard-task-dialog.component';
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
    HttpClientModule,
    DividerModule,
    CheckboxModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class DashboardModule {}
