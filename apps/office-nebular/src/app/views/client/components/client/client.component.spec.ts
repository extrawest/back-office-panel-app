import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { ClientModule } from './../../client.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '@office-app/services/user-service';
import { of } from 'rxjs';
import { Ticket } from '@office-app/services/ticket-interface';
import { PriorityEnum } from '@office-app/services/priority-enum';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NbThemeModule } from '@nebular/theme';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let tickets: Ticket[];

  beforeEach(async () => {
    tickets = [
      {
        customerName: 'testUser',
        date: '2023-02-01',
        priority: PriorityEnum.HIGH,
        ticketDetails: 'ticket',
        ticketId: '-NNkqwm1B_bU6r8rXtUL',
      },
    ];
    const userService = jasmine.createSpyObj('UserService', ['getUserTickets']);
    userService.getUserTickets.and.returnValue(of(tickets));
    await TestBed.configureTestingModule({
      imports: [
        ClientModule,
        BrowserAnimationsModule,
        provideAuth(() => getAuth()),
        NbThemeModule.forRoot(),
      ],
      declarations: [ClientComponent],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get tickets', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.ticketsArray).toEqual(tickets);
  }));

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

  it('should have 3 priorities value', function () {
    expect(component.priorities.length).toBe(3);
  });
});
