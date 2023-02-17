import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuRoutes } from './side-menu.routes';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NbSidebarModule, NbCardModule, NbLayoutModule } from '@nebular/theme';
import { NbThemeModule, NbInputModule } from '@nebular/theme';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuRoutes,
    NbThemeModule,
    NbSidebarModule.forRoot(),
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    FooterModule
  ],
})
export class SideMenuModule {}
