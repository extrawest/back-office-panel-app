import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnresolvedTicket } from '@office-app/services/unresolved-ticket-interface';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'office-app-dashboard-ticket',
  templateUrl: './dashboard-ticket.component.html',
  styleUrls: ['./dashboard-ticket.component.scss'],
})
export class DashboardTicketComponent implements OnDestroy {
  public form: FormGroup;
  public unresolvedTickets: UnresolvedTicket[] = [];

  private componentDestroyed$: Subject<void> = new Subject();
  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      ticketName: ['', [Validators.required]],
      ticketNumber: ['', [Validators.required]],
    });
    this.getUserUnresolvedTickets();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }

  public addUnresolvedTicket() {
    const { ticketName, ticketNumber } = this.form.getRawValue();
    this.userService
      .addUnresolvedTicket(ticketName, ticketNumber)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.getUserUnresolvedTickets();
        },
      });
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
}
