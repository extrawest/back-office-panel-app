import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';
import { LoginComponent } from './../../../login/components/login/login.component';
import { UserService } from '@office-app/services/user-service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@office-app/services/auth-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let spy: jasmine.Spy;
  let userService: UserService;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      declarations: [SideMenuComponent],
      providers: [AuthService, { provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    spy = spyOn(userService, 'addProfileImage').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a name of user', () => {
    fixture.whenStable().then(() => {
      expect(component.userName.length).not.toBe(0);
    });
  });
  it('should render 6 menu items', () => {
    expect(component.menuItems.length).toBe(6);
  });
  it('should redirect to login page after logout', fakeAsync(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    component.onLogout();
    tick();
    expect(location.path()).toBe('/login');
  }));
});
