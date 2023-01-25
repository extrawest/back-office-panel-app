import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '@office-app/services/user-service';
import { UnresolvedTicket } from '@office-app/services/unresolved-ticket-interface';

@Component({
  selector: 'office-app-dashboard-ticket',
  templateUrl: './dashboard-ticket.component.html',
  styleUrls: ['./dashboard-ticket.component.scss'],
})
export class DashboardTicketComponent implements OnDestroy {
  public unresolvedTickets: UnresolvedTicket[] = [];
  public displayModal: boolean;
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(private userService: UserService) {
    this.getUserUnresolvedTickets();
  }

  public showModalDialog() {
    this.displayModal = true;
  }

  public closeAccountModal(event: boolean) {
    if (event) {
      this.displayModal = false;
      this.getUserUnresolvedTickets();
    }
  }

  private getUserUnresolvedTickets() {
    this.userService
      .getUserUnresolvedTickets()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((result: any[]) => {
        if (!result) {
          return;
        }
        this.unresolvedTickets = [...Object.values(result)].reverse();
      });
    this.unresolvedTickets = [];
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
