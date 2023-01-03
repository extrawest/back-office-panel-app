import { Component, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddTicketComponent } from './../add-ticket/add-ticket.component';
import { PriorityEnum } from '@office-app/services/priority-enum';

@Component({
  selector: 'office-app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  displayedColumns: string[] = ['details', 'name', 'date', 'priority'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ticketDetails: string;
  customerName: string;
  date: string;
  priority: PriorityEnum;

  constructor(
    public dialog: MatDialog,
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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTicketComponent, {
      data: {
        ticketDetails: this.ticketDetails,
        customerName: this.customerName,
        date: this.date,
        priority: this.priority,
      },
      width: '55%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe();
  }
}
