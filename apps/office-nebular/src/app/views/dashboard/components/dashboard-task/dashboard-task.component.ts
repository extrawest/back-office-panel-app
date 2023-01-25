import { Component, TemplateRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@office-app/services/user-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskTypes } from '@office-app/services/task-types';
import { NbDialogService } from '@nebular/theme';
import { Task } from '@office-app/services/task-interface';

@Component({
  selector: 'office-app-dashboard-task',
  templateUrl: './dashboard-task.component.html',
  styleUrls: ['./dashboard-task.component.scss'],
  providers: [NbDialogService],
})
export class DashboardTaskComponent implements OnDestroy {
  public form: FormGroup;
  public statuses = TaskTypes;
  public tasks: Task[] = [];
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      taskName: [''],
      taskStatus: [''],
    });
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }

  public addTask() {
    const { taskName, taskStatus } = this.form.getRawValue();
    this.userService
      .addTask(taskName, taskStatus)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.getTasks();
        },
      });
  }

  private getTasks() {
    this.userService
      .getUserTasks()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((result: any[]) => {
        if (!result) {
          return;
        }
        this.tasks = [...Object.values(result)].reverse();
      });
    this.tasks = [];
  }
}
