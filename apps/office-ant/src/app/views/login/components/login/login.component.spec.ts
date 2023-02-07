import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '@office-app/services/auth-service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './../../../register/components/register/register.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LoginModule } from './../../login.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let AuthService: AuthService;
  let router: Router;

  beforeEach(async () => {
    const authService = jasmine.createSpyObj('AuthService', [
      'login',
      'signInWithGoogle',
      'signInWithFacebook',
      'resetPassword',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        LoginModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        RouterTestingModule.withRoutes([
          { path: 'register', component: RegisterComponent },
        ]),
      ],
      declarations: [LoginComponent, RegisterComponent],
      providers: [{ provide: AuthService, useValue: authService }],
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

  it('resetPassword field validity', () => {
    const resetPassword = component.formReset.controls['resetPassword'];
    expect(resetPassword.valid).toBeFalsy();
    resetPassword.setValue('');
    expect(resetPassword.hasError('required')).toBeTruthy();
  });

  it('formReset should be valid', () => {
    component.formReset.controls['resetPassword'].setValue('test@test.com');
    expect(component.formReset.valid).toBeTruthy();
  });

  it('should toggle #resetPassword', fakeAsync(() => {
    expect(component.resetPassword).toBe(false);
    fixture.nativeElement.querySelector('a').click();
    tick();
    expect(component.resetPassword).toBe(true);
  }));

  it('should redirect to home page after login', fakeAsync(() => {
    router = TestBed.inject(Router);
    router.initialNavigation();
    fixture.nativeElement.querySelector('p[routerLink]').click();
    fixture.whenStable().then(() => {
      expect(router.url).toEqual('/register');
    });
  }));
});
