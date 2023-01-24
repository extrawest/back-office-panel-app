import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTaskDialogComponent } from './dashboard-task-dialog.component';

describe('DashboardTaskDialogComponent', () => {
  let component: DashboardTaskDialogComponent;
  let fixture: ComponentFixture<DashboardTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTaskDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
