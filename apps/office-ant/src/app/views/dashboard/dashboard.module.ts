import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent,
  },
];

@NgModule({
  declarations: [DashboardMainComponent, DashboardChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class DashboardModule {}
