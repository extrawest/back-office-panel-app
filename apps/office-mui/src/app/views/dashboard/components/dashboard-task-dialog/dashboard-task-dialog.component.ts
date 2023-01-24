import { Component, Inject, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { UserService } from '@office-app/services/user-service';
import { TaskTypes } from '@office-app/services/task-types';

@Component({
  selector: 'office-app-dashboard-task-dialog',
  templateUrl: './dashboard-task-dialog.component.html',
  styleUrls: ['./dashboard-task-dialog.component.scss'],
})
export class DashboardTaskDialogComponent implements OnDestroy {
  public form: FormGroup;
  public isModalClosed = false;
  public taskTypes = TaskTypes;
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<DashboardTaskDialogComponent>,
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
      taskName: [''],
      taskStatus: [''],
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

  public addTask() {
    const { taskName, taskStatus } = this.form.getRawValue();
    this.userService
      .addTask(taskName, taskStatus)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.closeDialog();
          this.isModalClosed = true;
        },
      });
  }
}
