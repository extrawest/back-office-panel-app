import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './components/client/client.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
  },
];

@NgModule({
  declarations: [ClientComponent, AddTicketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzTableModule,
    NzGridModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule
  ],
})
export class ClientModule {}
