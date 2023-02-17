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
      imports: [ClientModule, BrowserAnimationsModule],
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

  it('should change value of displayModal', () => {
    component.showModalDialog();
    fixture.detectChanges();
    expect(component.displayModal).toBe(true);
  });

  it('should display modal window', () => {
    const modalEl = fixture.nativeElement.querySelectorAll(
      'office-app-add-ticket'
    );
    component.showModalDialog();
    fixture.detectChanges();
    expect(modalEl).toBeTruthy();
  });

  it('should close modal window', () => {
    const methodPeremeter = true;
    component.closeAccountModal(methodPeremeter);
    fixture.detectChanges();
    expect(component.displayModal).toBe(false);
  });

  it('should get tickets', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.ticketsArray).toEqual(tickets);
  }));
});
