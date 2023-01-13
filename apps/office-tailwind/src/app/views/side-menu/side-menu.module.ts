import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuRoutes } from './side-menu.routes';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuRoutes,
  ],
})
export class SideMenuModule {}
