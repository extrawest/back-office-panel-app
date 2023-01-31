import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuRoutes } from './side-menu.routes';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { FileUploadModule } from 'primeng/fileupload';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuRoutes,
    SidebarModule,
    FileUploadModule,
    FooterModule
  ],
})
export class SideMenuModule {}
