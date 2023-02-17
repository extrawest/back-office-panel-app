import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTicketComponent } from './dashboard-ticket.component';
import { DashboardModule } from './../../dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule } from '@nebular/theme';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';

describe('DashboardTicketComponent', () => {
  let component: DashboardTicketComponent;
  let fixture: ComponentFixture<DashboardTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot(),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      declarations: [DashboardTicketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTicketComponent);
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
});
