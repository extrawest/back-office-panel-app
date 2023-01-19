import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { Ticket } from '@office-app/services/ticket-interface';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Priorities } from '@office-app/services/priorities';

@Component({
  selector: 'office-app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnDestroy {
  public ticketsArray: Ticket[] = [];
  public form: FormGroup;
  public priorities = Priorities;
  public displayModal: boolean;
  public headers: string[] = [
    'Ticket details',
    'Customer name',
    'Date',
    'Priority',
  ];
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(
    private userService: UserService,
    private dialogService: NbDialogService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      ticketDetails: [''],
      customerName: [''],
      date: [''],
      priority: [''],
    });
    this.getTickets();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }

  public addTicket() {
    const { ticketDetails, customerName, date, priority } =
      this.form.getRawValue();
    this.userService
      .addTicket(ticketDetails, customerName, date, priority)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.getTickets();
        },
      });
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
