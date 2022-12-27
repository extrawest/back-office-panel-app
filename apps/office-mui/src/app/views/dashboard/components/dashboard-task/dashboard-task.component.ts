import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'office-app-dashboard-task',
  templateUrl: './dashboard-task.component.html',
  styleUrls: ['./dashboard-task.component.scss'],
})
export class DashboardTaskComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'add-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/add-icon.svg'
      )
    );
  }
}
