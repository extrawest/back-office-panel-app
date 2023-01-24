import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardTicketDialogComponent } from '../dashboard-ticket-dialog/dashboard-ticket-dialog.component';
import { UserService } from '@office-app/services/user-service';
import { UnresolvedTicket } from '@office-app/services/unresolved-ticket-interface';

@Component({
  selector: 'office-app-dashboard-ticket',
  templateUrl: './dashboard-ticket.component.html',
  styleUrls: ['./dashboard-ticket.component.scss'],
})
export class DashboardTicketComponent implements OnDestroy {
  public unresolvedTicket: UnresolvedTicket[] = [];
  private ticketName: string;
  private ticketNumber: number;
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(public dialog: MatDialog, private userService: UserService) {
    this.getUserUnresolvedTickets();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DashboardTicketDialogComponent, {
      data: {
        ticketName: this.ticketName,
        ticketNumber: this.ticketNumber,
      },
      width: '50%',
      height: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.getUserUnresolvedTickets();
        },
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  private getUserUnresolvedTickets() {
    this.userService
      .getUserUnresolvedTickets()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((result: any[]) => {
        if (!result) {
          return;
        }
        this.unresolvedTicket = [...Object.values(result)].reverse();
      });
    this.unresolvedTicket = [];
  }
}
