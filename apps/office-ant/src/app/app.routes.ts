import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./views/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./views/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/side-menu/side-menu.module').then(
        (m) => m.SideMenuModule
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
