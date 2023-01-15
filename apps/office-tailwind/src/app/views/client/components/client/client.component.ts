import { Component, OnDestroy } from '@angular/core';
import { PriorityEnum } from '@office-app/services/priority-enum';
import { Ticket } from '@office-app/services/ticket-interface';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'office-app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnDestroy {
  public ticketsArray: Ticket[] = [];
  public displayModal: boolean;
  public headers: string[] = [
    'Ticket details',
    'Customer name',
    'Date',
    'Priority',
  ];
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(private userService: UserService) {
    this.getTickets();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public showModalDialog() {
    this.displayModal = true;
  }

  public closeAccountModal(event: boolean) {
    if (event) {
      this.displayModal = false;
      this.getTickets();
    }
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
      });
    this.ticketsArray = [];
  }
}
