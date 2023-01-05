import { RouterModule, Routes } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
export const routes: Routes = [
  {
    path: '',
    component: SideMenuComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./../../views/dashboard/dashboard.module').then(
      //       (m) => m.DashboardModule
      //     ),
      // },
      // {
      //   path: 'clients',
      //   loadChildren: () =>
      //     import('./../../views/client/client.module').then(
      //       (m) => m.ClientModule
      //     ),
      // },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

export const SideMenuRoutes = RouterModule.forChild(routes);
