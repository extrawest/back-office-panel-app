import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';
import { LoginComponent } from './../../../login/components/login/login.component';
import { SideMenuModule } from './../../side-menu.module';
import { AuthService } from '@office-app/services/auth-service';
import { RouterTestingModule } from '@angular/router/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment.prod';
import { getAuth, provideAuth } from '@angular/fire/auth';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SideMenuModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      declarations: [SideMenuComponent],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a name of user', fakeAsync(() => {
    tick();
    expect(component.userName?.length).not.toBe(0);
  }));

  it('should render 6 menu items', fakeAsync(() => {
    tick();
    expect(component.menuItems.length).toEqual(6);
  }));
});
