import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { ClientModule } from './../../client.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment.prod';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientModule,
        BrowserAnimationsModule,
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      ],
      declarations: [ClientComponent],
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
