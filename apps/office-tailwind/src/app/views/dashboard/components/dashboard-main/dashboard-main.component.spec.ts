import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardMainComponent } from './dashboard-main.component';
import { DashboardChartComponent } from './../dashboard-chart/dashboard-chart.component';
import { DashboardModule } from './../../dashboard.module';
import { UserService } from '@office-app/services/user-service';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment';

describe('DashboardMainComponent', () => {
  let component: DashboardMainComponent;
  let fixture: ComponentFixture<DashboardMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      declarations: [DashboardMainComponent, DashboardChartComponent],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain(
      'Dashboard'
    );
  });

  it('should render chart component', () => {
    expect(
      fixture.nativeElement.querySelector('office-app-dashboard-chart')
    ).toBeTruthy();
  });

  it('should render ticket component', () => {
    expect(
      fixture.nativeElement.querySelector('office-app-dashboard-ticket')
    ).toBeTruthy();
  });

  it('should render task component', () => {
    expect(
      fixture.nativeElement.querySelector('office-app-dashboard-task')
    ).toBeTruthy();
  });
});
