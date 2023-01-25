import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskTypes } from '@office-app/services/task-types';

@Component({
  selector: 'office-app-dashboard-task-dialog',
  templateUrl: './dashboard-task-dialog.component.html',
  styleUrls: ['./dashboard-task-dialog.component.scss'],
})
export class DashboardTaskDialogComponent implements OnDestroy {
  @Output() isModalClosed = new EventEmitter<boolean>();
  public form: FormGroup;
  private componentDestroyed$: Subject<void> = new Subject();
  public isModalVisible = true;
  statuses: any = [];
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      taskName: [''],
      taskStatus: [''],
    });
    TaskTypes.map((type) => {
      const obj: any = {};
      obj.name = type;
      this.statuses.push(obj);
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
      .addTask(taskName, taskStatus.name)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.closeModal();
        },
      });
  }
}
