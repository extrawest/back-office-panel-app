import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './components/client/client.component';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';

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
  ],
})
export class ClientModule {}
