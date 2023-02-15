import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTaskDialogComponent } from './dashboard-task-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './../../dashboard.module';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment';

describe('DashboardTaskDialogComponent', () => {
  let component: DashboardTaskDialogComponent;
  let fixture: ComponentFixture<DashboardTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
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

  it('should close modal', () => {
    component.closeModal();
    fixture.detectChanges();
    expect(component.isModalVisible).toBe(false);
  });
});
