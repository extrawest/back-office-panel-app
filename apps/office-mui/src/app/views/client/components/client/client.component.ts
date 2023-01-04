import {
  Component,
  Inject,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  Input,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddTicketComponent } from './../add-ticket/add-ticket.component';
import { PriorityEnum } from '@office-app/services/priority-enum';
import { Ticket } from '@office-app/services/ticket-interface';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'office-app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  displayedColumns: string[] = ['details', 'name', 'date', 'priority'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren(AddTicketComponent, { read: Component })
  addTicketComponent: AddTicketComponent;
  @ViewChild(AddTicketComponent, { read: ElementRef }) test: AddTicketComponent;
  isModalWindowClosed: boolean;
  ticketDetails: string;
  customerName: string;
  date: string;
  priority: PriorityEnum;
  dataSource: MatTableDataSource<Ticket>;
  ticketsArray: Ticket[] = [];

  constructor(
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService
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
    this.getTickets();
  }

  public openDialog(): void {
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

  private getTickets() {
    this.userService.getUserTickets().subscribe((result) => {
      if (result) {
        console.log(result);
        Object.values(result).forEach((value: any) => {
          this.ticketsArray.push(value);
        });
        this.ticketsArray.reverse();
        this.dataSource = new MatTableDataSource<Ticket>(this.ticketsArray);
        this.dataSource.paginator = this.paginator;
      }
    });
    this.ticketsArray = [];
  }
}
