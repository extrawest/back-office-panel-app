import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTicketDialogComponent } from './dashboard-ticket-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './../../dashboard.module';

describe('DashboardTicketDialogComponent', () => {
  let component: DashboardTicketDialogComponent;
  let fixture: ComponentFixture<DashboardTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DashboardModule],
      declarations: [DashboardTicketDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.form.controls['ticketName'].setValue('');
    component.form.controls['ticketNumber'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('ticketName field validity', () => {
    const ticketName = component.form.controls['ticketName'];
    expect(ticketName.valid).toBeFalsy();
    ticketName.setValue('');
    expect(ticketName.hasError('required')).toBeTruthy();
  });

  it('ticketNumber field validity', () => {
    const ticketNumber = component.form.controls['ticketNumber'];
    expect(ticketNumber.valid).toBeFalsy();
    ticketNumber.setValue('');
    expect(ticketNumber.hasError('required')).toBeTruthy();
  });

  it('form should be valid', () => {
    component.form.controls['ticketName'].setValue('test');
    component.form.controls['ticketNumber'].setValue(5);
    expect(component.form.valid).toBeTruthy();
  });

  it('should close modal', () => {
    component.closeModal();
    fixture.detectChanges();
    expect(component.isModalVisible).toBe(false);
  });
});
