import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartComponent } from './dashboard-chart.component';
import { DashboardModule } from './../../dashboard.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

describe('DashboardChartComponent', () => {
  let component: DashboardChartComponent;
  let fixture: ComponentFixture<DashboardChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
      ],
      declarations: [DashboardChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display graph', () => {
    const graphEl = fixture.nativeElement.querySelector('div');
    fixture.whenStable().then(() => {
      expect(graphEl).toBeTruthy();
    });
  });
});
