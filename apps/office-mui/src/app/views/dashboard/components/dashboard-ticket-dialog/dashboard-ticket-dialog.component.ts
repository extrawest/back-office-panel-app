import { Component, Inject, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { UserService } from '@office-app/services/user-service';
import { UnresolvedTicket } from '@office-app/services/unresolved-ticket-interface';

@Component({
  selector: 'office-app-dashboard-ticket-dialog',
  templateUrl: './dashboard-ticket-dialog.component.html',
  styleUrls: ['./dashboard-ticket-dialog.component.scss'],
})
export class DashboardTicketDialogComponent implements OnDestroy {
  public form: FormGroup;
  public isModalClosed = false;
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<DashboardTicketDialogComponent>,
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
      ticketName: ['', [Validators.required]],
      ticketNumber: ['', [Validators.required]],
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

  public addUnresolvedTicket() {
    const { ticketName, ticketNumber } = this.form.getRawValue();
    this.userService
      .addUnresolvedTicket(ticketName, ticketNumber)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.closeDialog();
          this.isModalClosed = true;
        },
      });
  }
}
