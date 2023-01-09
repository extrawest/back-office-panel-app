import { RouterModule, Routes } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
export const routes: Routes = [
  {
    path: '',
    component: SideMenuComponent,
  },
];

export const SideMenuRoutes = RouterModule.forChild(routes);
