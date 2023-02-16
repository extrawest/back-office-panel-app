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
import { MatDialog } from '@angular/material/dialog';
import { PriorityEnum } from '@office-app/services/priority-enum';
import { EMPTY } from 'rxjs';

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

  it('should get tickets', fakeAsync(() => {
    component.ngOnInit();
    const thEl = fixture.nativeElement.querySelectorAll('th');
    tick();
    expect(thEl.length).toEqual(4);
  }));

  it('should have 4 th elements', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.ticketsArray).toEqual(tickets);
  }));

  it('should open modal', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({
      afterClosed: () => EMPTY,
    });
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call method and unsubscribe on destroy', () => {
    const destroy = spyOn(component, 'ngOnDestroy').and.callThrough();
    const next = spyOn(component.componentDestroyed$, 'next');
    const complete = spyOn(component.componentDestroyed$, 'complete');
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(destroy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(complete).toHaveBeenCalled();
  });
});
