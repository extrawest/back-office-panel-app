import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTaskDialogComponent } from './dashboard-task-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './../../dashboard.module';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const dialogMock = {
  close: () => {},
};

describe('DashboardTaskDialogComponent', () => {
  let component: DashboardTaskDialogComponent;
  let fixture: ComponentFixture<DashboardTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        BrowserAnimationsModule,
        MatDialogModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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

  it('should have 3 task statuses value', function () {
    expect(component.taskTypes.length).toBe(3);
  });

  it('should call the function to close the dialog', () => {
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.closeDialog();
    expect(spy).toHaveBeenCalled();
  });
});
