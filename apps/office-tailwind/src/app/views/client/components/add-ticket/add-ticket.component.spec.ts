import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTicketComponent } from './add-ticket.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientModule } from './../../client.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';

describe('AddTicketComponent', () => {
  let component: AddTicketComponent;
  let fixture: ComponentFixture<AddTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      declarations: [AddTicketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.form.controls['ticketDetails'].setValue('');
    component.form.controls['customerName'].setValue('');
    component.form.controls['date'].setValue('');
    component.form.controls['priority'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('ticketDetails field validity', () => {
    const ticketDetails = component.form.controls['ticketDetails'];
    expect(ticketDetails.valid).toBeFalsy();
    ticketDetails.setValue('');
    expect(ticketDetails.hasError('required')).toBeTruthy();
  });

  it('customerName field validity', () => {
    const customerName = component.form.controls['customerName'];
    expect(customerName.valid).toBeFalsy();
    customerName.setValue('');
    expect(customerName.hasError('required')).toBeTruthy();
  });

  it('date field validity', () => {
    const date = component.form.controls['date'];
    expect(date.valid).toBeFalsy();
    date.setValue('');
    expect(date.hasError('required')).toBeTruthy();
  });

  it('priority field validity', () => {
    const priority = component.form.controls['priority'];
    expect(priority.valid).toBeFalsy();
    priority.setValue('');
    expect(priority.hasError('required')).toBeTruthy();
  });

  it('form should be valid', () => {
    component.form.controls['ticketDetails'].setValue('testTicket');
    component.form.controls['customerName'].setValue('test');
    component.form.controls['date'].setValue('02/07/2023');
    component.form.controls['priority'].setValue('LOW');
    expect(component.form.valid).toBeTruthy();
  });

  it('should change value of isModalVisible', () => {
    component.closeModal();
    expect(component.isModalVisible).toBe(false);
  });

  it('should have 3 priorities value', () => {
    fixture.whenStable().then(() => {
      expect(component.priorities.length).toEqual(3);
    });
  });

  it('should close modal', () => {
    component.closeModal();
    fixture.detectChanges();
    expect(component.isModalVisible).toBe(false);
  });
});
