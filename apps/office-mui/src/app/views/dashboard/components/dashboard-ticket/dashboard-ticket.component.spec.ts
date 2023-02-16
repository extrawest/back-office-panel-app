import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { DashboardTicketComponent } from './dashboard-ticket.component';
import { DashboardTicketDialogComponent } from './../dashboard-ticket-dialog/dashboard-ticket-dialog.component';
import { DashboardModule } from './../../dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '@office-app/services/user-service';
import { of } from 'rxjs';
import { UnresolvedTicket } from '@office-app/services/unresolved-ticket-interface';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';

describe('DashboardTicketComponent', () => {
  let component: DashboardTicketComponent;
  let fixture: ComponentFixture<DashboardTicketComponent>;
  let unresolvedTickets: UnresolvedTicket[];

  beforeEach(async () => {
    unresolvedTickets = [
      {
        ticketId: '-NOEk-4xHBGWLBodTZD2',
        ticketName: 'test',
        ticketNumber: 100,
      },
    ];
    const userService = jasmine.createSpyObj('UserService', [
      'getUserUnresolvedTickets',
    ]);
    userService.getUserUnresolvedTickets.and.returnValue(of(unresolvedTickets));
    await TestBed.configureTestingModule({
      imports: [DashboardModule, BrowserAnimationsModule],
      declarations: [DashboardTicketComponent, DashboardTicketDialogComponent],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get unresolved tickets', fakeAsync(() => {
    component.ngOnInit();
    tick(100);
    expect(component.unresolvedTicket).toEqual(unresolvedTickets);
  }));

  it('should open modal', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({
      afterClosed: () => EMPTY,
    });
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });
});
