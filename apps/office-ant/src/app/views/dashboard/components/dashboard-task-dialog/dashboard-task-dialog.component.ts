import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskTypes } from '@office-app/services/task-types';

@Component({
  selector: 'office-app-dashboard-task-dialog',
  templateUrl: './dashboard-task-dialog.component.html',
  styleUrls: ['./dashboard-task-dialog.component.less'],
})
export class DashboardTaskDialogComponent implements OnDestroy {
  @Output() isModalClosed = new EventEmitter<boolean>();
  public form: FormGroup;
  public isModalVisible = true;
  public statuses = TaskTypes;
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      taskName: ['', [Validators.required]],
      taskStatus: ['', [Validators.required]],
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

  public addTask() {
    const { taskName, taskStatus } = this.form.getRawValue();
    this.userService
      .addTask(taskName, taskStatus)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.closeModal();
        },
      });
  }
}
