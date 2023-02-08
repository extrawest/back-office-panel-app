import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTicketComponent } from './dashboard-ticket.component';
import { DashboardTicketDialogComponent } from './../dashboard-ticket-dialog/dashboard-ticket-dialog.component';
import { DashboardModule } from './../../dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusCircleOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
const icons: IconDefinition[] = [PlusCircleOutline];

describe('DashboardTicketComponent', () => {
  let component: DashboardTicketComponent;
  let fixture: ComponentFixture<DashboardTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardModule, BrowserAnimationsModule, NzIconModule.forChild(icons),],
      declarations: [DashboardTicketComponent, DashboardTicketDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show dialog window', () => {
    component.showModalDialog();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('office-app-dashboard-ticket-dialog')
    ).toBeTruthy();
  });
});
