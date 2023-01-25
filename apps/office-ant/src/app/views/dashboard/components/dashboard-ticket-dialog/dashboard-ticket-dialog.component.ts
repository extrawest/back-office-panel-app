import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'office-app-dashboard-ticket-dialog',
  templateUrl: './dashboard-ticket-dialog.component.html',
  styleUrls: ['./dashboard-ticket-dialog.component.less'],
})
export class DashboardTicketDialogComponent implements OnDestroy {
  @Output() isModalClosed = new EventEmitter<boolean>();
  public form: FormGroup;
  private componentDestroyed$: Subject<void> = new Subject();
  public isModalVisible = true;
  constructor(private userService: UserService, private fb: FormBuilder) {
    this.form = this.fb.group({
      ticketName: [''],
      ticketNumber: [''],
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public closeModal() {
    this.isModalVisible = false;
    this.isModalClosed.emit(true);
  }

  public addUnresolvedTicket() {
    const { ticketName, ticketNumber } = this.form.getRawValue();
    this.userService
      .addUnresolvedTicket(ticketName, ticketNumber)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.closeModal();
        },
      });
  }
}
