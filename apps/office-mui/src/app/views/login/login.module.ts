import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconRegistry } from '@angular/material/icon';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {MatGridListModule} from '@angular/material/grid-list';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    HttpClientModule,
    MatGridListModule
  ],
  exports: [LoginComponent],
  providers: [MatIconRegistry],
})
export class LoginModule {}
