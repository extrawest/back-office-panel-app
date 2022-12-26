import { Component } from '@angular/core';

@Component({
  selector: 'office-app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  menuItems = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      image: './assets/icons/info-icon.png'
    },
    {
      name: 'Team',
      image: './assets/icons/team-icon.png'
    },
    {
      name: 'Offers',
      image: './assets/icons/offer-icon.png'
    },
    {
      name: 'Partners',
      image: './assets/icons/call-center-icon.png'
    },
    {
      name: 'Finances',
      image: './assets/icons/finance-icon.png'
    },
    {
      name: 'Clients',
      url: '/clients',
      image: './assets/icons/man-icon.png'
    },
    
  ]
  constructor() {}
}
