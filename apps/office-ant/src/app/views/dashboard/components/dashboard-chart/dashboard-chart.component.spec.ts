import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartComponent } from './dashboard-chart.component';

describe('DashboardChartComponent', () => {
  let component: DashboardChartComponent;
  let fixture: ComponentFixture<DashboardChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get graph data', () => {
    fixture.whenStable().then(() => {
      expect(component.graphData.length).not.toBe(0);
    });
  });

  it('should display graph', () => {
    const graphEl = fixture.nativeElement.querySelector('div');
    fixture.whenStable().then(() => {
      expect(graphEl).toBeTruthy();
    });
  });
});
