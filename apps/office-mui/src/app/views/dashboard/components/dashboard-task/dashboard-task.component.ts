import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardTaskDialogComponent } from '../dashboard-task-dialog/dashboard-task-dialog.component';
import { UserService } from '@office-app/services/user-service';
import { TaskTypeEnum } from '@office-app/services/task-types-enum';
import { Task } from '@office-app/services/task-interface';

@Component({
  selector: 'office-app-dashboard-task',
  templateUrl: './dashboard-task.component.html',
  styleUrls: ['./dashboard-task.component.scss'],
})
export class DashboardTaskComponent implements OnDestroy {
  taskName: string;
  taskStatus: TaskTypeEnum;
  tasks: Task[] = [];
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService
  ) {
    this.matIconRegistry.addSvgIcon(
      'add-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/add-icon.svg'
      )
    );
  }

  ngOnInit() {
    this.getTasks();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DashboardTaskDialogComponent, {
      data: {
        taskName: this.taskName,
        ticketNumber: this.taskStatus,
      },
      width: '50%',
      height: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => {
          this.getTasks();
        },
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
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
  }
}
