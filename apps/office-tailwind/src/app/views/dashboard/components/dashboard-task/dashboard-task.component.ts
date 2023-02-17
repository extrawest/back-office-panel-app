import { Component, OnDestroy } from '@angular/core';
import { UserService } from '@office-app/services/user-service';
import { Task } from '@office-app/services/task-interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'office-app-dashboard-task',
  templateUrl: './dashboard-task.component.html',
  styleUrls: ['./dashboard-task.component.css'],
})
export class DashboardTaskComponent implements OnDestroy {
  public displayModal: boolean;
  public tasks: Task[] = [];
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getTasks();
  }

  public showModalDialog() {
    this.displayModal = true;
  }

  public closeAccountModal(event: boolean) {
    if (event) {
      this.displayModal = false;
      this.getTasks();
    }
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
