import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './components/client/client.component';
import {
  NbCardModule,
  NbThemeModule,
  NbTreeGridModule,
  NbDialogModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
} from '@nebular/theme';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
  },
];

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbCardModule,
    NbThemeModule,
    NbTreeGridModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
  ],
})
export class ClientModule {}
