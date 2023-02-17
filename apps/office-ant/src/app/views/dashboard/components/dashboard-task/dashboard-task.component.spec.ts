import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { DashboardTaskComponent } from './dashboard-task.component';
import { DashboardModule } from './../../dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusCircleOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
const icons: IconDefinition[] = [PlusCircleOutline];
import { UserService } from '@office-app/services/user-service';
import { of } from 'rxjs';
import { Task } from '@office-app/services/task-interface';
import { TaskTypeEnum } from '@office-app/services/task-types-enum';

describe('DashboardTaskComponent', () => {
  let component: DashboardTaskComponent;
  let fixture: ComponentFixture<DashboardTaskComponent>;
  let tasks: Task[];

  beforeEach(async () => {
    tasks = [
      {
        taskId: '-NOEk-48UwR-2QTIWNzc',
        taskName: 'task',
        taskStatus: TaskTypeEnum.NEW,
      },
    ];
    const userService = jasmine.createSpyObj('UserService', ['getUserTasks']);
    userService.getUserTasks.and.returnValue(of(tasks));
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        BrowserAnimationsModule,
        NzIconModule.forChild(icons),
      ],
      declarations: [DashboardTaskComponent],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show dialog window', () => {
    component.displayModal = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('office-app-dashboard-task-dialog')
    ).toBeTruthy();
  });

  it('should get tasks', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.tasks).toEqual(tasks);
  }));
});
