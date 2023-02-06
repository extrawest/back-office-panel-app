import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DashboardTaskDialogComponent } from './dashboard-task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

describe('DashboardTaskDialogComponent', () => {
  let component: DashboardTaskDialogComponent;
  let fixture: ComponentFixture<DashboardTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
      ],
      declarations: [DashboardTaskDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.form.controls['taskName'].setValue('');
    component.form.controls['taskStatus'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('taskName field validity', () => {
    const taskName = component.form.controls['taskName'];
    expect(taskName.valid).toBeFalsy();
    taskName.setValue('');
    expect(taskName.hasError('required')).toBeTruthy();
  });

  it('taskStatus field validity', () => {
    const taskStatus = component.form.controls['taskStatus'];
    expect(taskStatus.valid).toBeFalsy();
    taskStatus.setValue('');
    expect(taskStatus.hasError('required')).toBeTruthy();
  });

  it('form should be valid', () => {
    component.form.controls['taskName'].setValue('test');
    component.form.controls['taskStatus'].setValue('NEW');
    expect(component.form.valid).toBeTruthy();
  });

  it('should have 3 task statuses value', () => {
    fixture.whenStable().then(() => {
      expect(component.statuses.length).toEqual(3);
    });
  });

  it('should add task and close modal', fakeAsync(() => {
    component.addTask();
    tick();
    expect(component.isModalClosed).toBeFalsy();
  }));
});
