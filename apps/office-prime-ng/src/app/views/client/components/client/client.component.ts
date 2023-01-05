import { Component, OnDestroy } from '@angular/core';
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
  public ticketsArray: Ticket[] = [];
  public headers: string[] = [
    'Ticket details',
    'Customer name',
    'Date',
    'Priority',
  ];
  first = 0;

  rows = 10;
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(private userService: UserService) {
    this.getTickets();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.ticketsArray
      ? this.first === this.ticketsArray.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.ticketsArray ? this.first === 0 : true;
  }

  private getTickets() {
    this.userService
      .getUserTickets()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((result) => {
        if (result) {
          Object.values(result).forEach((value: any) => {
            this.ticketsArray.push(value);
          });
          this.ticketsArray.reverse();
        }
      });
    this.ticketsArray = [];
  }
}
