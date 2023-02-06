import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComponent } from './client.component';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 th elements', () => {
    const thEl = fixture.nativeElement.querySelectorAll('th');
    expect(thEl.length).toEqual(4);
  });

  it('should get array tickets', () => {
    fixture.whenStable().then(() => {
      expect(component.ticketsArray.length).not.toBe(0);
    });
  });

  it('should change value of displayModal', () => {
    component.showModalDialog();
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
});
