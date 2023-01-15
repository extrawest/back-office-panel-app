import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@office-app/services/user-service';
import { Priorities } from '@office-app/services/priorities';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'office-app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})
export class AddTicketComponent implements OnDestroy {
  @Output() isModalClosed = new EventEmitter<boolean>();
  public form: FormGroup;
  public priorities = Priorities;
  private componentDestroyed$: Subject<void> = new Subject();
  public isModalVisible = true;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      ticketDetails: [''],
      customerName: [''],
      date: [''],
      priority: [''],
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

  public addTicket() {
    const { ticketDetails, customerName, date, priority } =
      this.form.getRawValue();
    this.userService
      .addTicket(ticketDetails, customerName, date, priority)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.closeModal();
        },
      });
  }
}
