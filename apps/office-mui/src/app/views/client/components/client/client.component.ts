import { Component, OnDestroy, ViewChild } from '@angular/core';
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
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'office-app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = ['details', 'name', 'date', 'priority'];
  public ticketDetails: string;
  public customerName: string;
  public date: string;
  public priority: PriorityEnum;
  public dataSource: MatTableDataSource<Ticket>;
  public ticketsArray: Ticket[] = [];
  private componentDestroyed$: Subject<void> = new Subject();

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

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddTicketComponent, {
      data: {
        ticketDetails: this.ticketDetails,
        customerName: this.customerName,
        date: this.date,
        priority: this.priority,
      },
      width: '65%',
      height: '60%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe();
  }

  private getTickets() {
    this.userService
      .getUserTickets()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((result: any[]) => {
        if (!result) {
          return;
        }
        this.ticketsArray = [...Object.values(result)].reverse();
        this.dataSource = new MatTableDataSource<any>(this.ticketsArray);
        this.dataSource.paginator = this.paginator;
      });
    this.ticketsArray = [];
  }
}
