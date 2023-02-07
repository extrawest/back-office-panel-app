import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideMenuRoutes } from './side-menu.routes';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FooterModule } from '../footer/footer.module';
import { LogoutOutline, UploadOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
const icons: IconDefinition[] = [LogoutOutline, UploadOutline];

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SideMenuRoutes,
    NzGridModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzUploadModule,
    NzSpaceModule,
    NzDividerModule,
    FooterModule,
  ],
})
export class SideMenuModule {}
