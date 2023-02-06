import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTicketComponent } from './dashboard-ticket.component';

describe('DashboardTicketComponent', () => {
  let component: DashboardTicketComponent;
  let fixture: ComponentFixture<DashboardTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTicketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show dialog window', ()=> {
    component.displayModal = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('office-app-dashboard-ticket-dialog')).toBeTruthy();
  })
});
