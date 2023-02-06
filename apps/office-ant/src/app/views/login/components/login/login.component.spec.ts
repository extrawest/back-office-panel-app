import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@office-app/services/auth-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { SideMenuComponent } from './../../../side-menu/components/side-menu/side-menu.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let AuthService: AuthService;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    const authService = jasmine.createSpyObj('AuthService', [
      'login',
      'signInWithGoogle',
      'signInWithFacebook',
      'resetPassword',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: SideMenuComponent },
        ]),
      ],
      declarations: [LoginComponent, SideMenuComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['password'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('username field validity', () => {
    const name = component.form.controls['name'];
    expect(name.valid).toBeFalsy();
    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('form should be valid', () => {
    component.form.controls['name'].setValue('test@test.com');
    component.form.controls['password'].setValue('test');
    expect(component.form.valid).toBeTruthy();
  });

  it('formReset invalid when empty', () => {
    component.formReset.controls['resetPassword'].setValue('');
    expect(component.formReset.valid).toBeFalsy();
  });

  it('username field validity', () => {
    const name = component.formReset.controls['resetPassword'];
    expect(name.valid).toBeFalsy();
    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
  });

  it('formReset should be valid', () => {
    component.formReset.controls['resetPassword'].setValue('test@test.com');
    expect(component.formReset.valid).toBeTruthy();
  });

  it('should toggle #toggleShowPassword', fakeAsync(() => {
    expect(component.toggleShowPassword).toBe(false);
    fixture.nativeElement.querySelector('a').click();
    tick();
    expect(component.toggleShowPassword).toBe(true);
  }));

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    fixture.nativeElement.querySelector('#register').click();
    expect(component.form).toHaveBeenCalledTimes(1);
  });

  it('should redirect to home page after login', fakeAsync(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    component.onSubmit();
    tick();
    expect(location.path()).toBe('/home');
  }));
});
