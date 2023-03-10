import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@office-app/services/user-service';
import { Priorities } from '@office-app/services/priorities';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'office-app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss'],
})
export class AddTicketComponent implements OnDestroy {
  @Output() isModalClosed = new EventEmitter<boolean>();
  public form: FormGroup;
  public priorities: any = [];
  private componentDestroyed$: Subject<void> = new Subject();
  public isModalVisible = true;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      ticketDetails: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
    Priorities.map((priority) => {
      const obj: any = {};
      obj.name = priority;
      this.priorities.push(obj);
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
      .addTicket(ticketDetails, customerName, date, priority.name)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.closeModal();
        },
      });
  }
}
