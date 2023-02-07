import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTaskComponent } from './dashboard-task.component';
import { DashboardModule } from './../../dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardTaskComponent', () => {
  let component: DashboardTaskComponent;
  let fixture: ComponentFixture<DashboardTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        BrowserAnimationsModule
      ],
      declarations: [DashboardTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show dialog window', () => {
    component.displayModal = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('office-app-dashboard-task-dialog')
    ).toBeTruthy();
  });
});
