import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { DividerModule } from 'primeng/divider';

const routes: Routes = [
  {
    path: '',
    component: FooterComponent,
  },
];

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    DividerModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
