import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'office-app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  displayedColumns: string[] = ['details', 'name', 'date', 'priority'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'plus-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/plus-icon.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'filter-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/filter-icon.svg'
      )
    );
  }
}
