import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { LoginModule } from './../../login.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from './../../../../../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './../login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      declarations: [ResetPasswordComponent, LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.form.controls['password'].setValue('');
    component.form.controls['isPasswordMatch'].setValue('');
    expect(component.form.valid).toBeFalsy();
  });

  it('password field validity', () => {
    const password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('isPasswordMatch field validity', () => {
    const isPasswordMatch = component.form.controls['isPasswordMatch'];
    expect(isPasswordMatch.valid).toBeFalsy();
    isPasswordMatch.setValue('');
    expect(isPasswordMatch.hasError('required')).toBeTruthy();
  });

  it('form should be valid', () => {
    component.form.controls['isPasswordMatch'].setValue('test');
    component.form.controls['password'].setValue('test');
    expect(component.form.valid).toBeTruthy();
  });

  it('should valid form', () => {
    component.form.controls['isPasswordMatch'].setValue('test');
    component.form.controls['password'].setValue('test');
    expect(component.isValidForm()).toBe(false);
    component.form.controls['isPasswordMatch'].setValue('test');
    component.form.controls['password'].setValue('test2');
    expect(component.isValidForm()).toBe(true);
  });
});
