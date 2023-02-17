import { Component, Inject, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Priorities } from '@office-app/services/priorities';

@Component({
  selector: 'office-app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss'],
})
export class AddTicketComponent implements OnDestroy{
  public form: FormGroup;
  public priorities = Priorities;
  public isModalClosed = false;
  public componentDestroyed$: Subject<void> = new Subject();
  
  constructor(
    public dialogRef: MatDialogRef<AddTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _ngZone: NgZone,
    private userService: UserService
  ) {
    this.matIconRegistry.addSvgIcon(
      'close-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/close-icon.svg'
      )
    );
    this.form = this.fb.group({
      ticketDetails: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      priority: ['', [Validators.required]],
    });
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public addTicket() {
    const { ticketDetails, customerName, date, priority } =
      this.form.getRawValue();
    this.userService
      .addTicket(ticketDetails, customerName, date, priority)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.closeDialog();
          this.isModalClosed = true;
        },
      });
  }
}
