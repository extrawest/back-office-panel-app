import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTicketDialogComponent } from './dashboard-ticket-dialog.component';

describe('DashboardTicketDialogComponent', () => {
  let component: DashboardTicketDialogComponent;
  let fixture: ComponentFixture<DashboardTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTicketDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
