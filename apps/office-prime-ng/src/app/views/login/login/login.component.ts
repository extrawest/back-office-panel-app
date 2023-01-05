import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@office-app/services/auth-service';
import { LocalStorageService } from '@office-app/services/local-storage-service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'office-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  toggleShowPassword = true;
  checked = false;
  formReset: FormGroup;
  message: Subject<string> = new Subject();
  resetPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      check: [''],
    });
    this.formReset = this.fb.group({
      resetPassword: ['', [Validators.required, Validators.email]],
    });
  }

  public isValidForm(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  public onSubmit() {
    const { name, password, check } = this.form.getRawValue();
    this.authService.login(name, password).subscribe({
      error: ({ code }) => this.showMessage(String(code)),
      next: (user) => {
        if (user) {
          this.redirectToHomePage();
          this.localStorageService.setValue(
            'user',
            JSON.stringify(user.user.uid)
          );
        }
      },
    });
  }

  public onSignInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  public onSignInWithFacebook(): void {
    this.authService.signInWithFacebook();
  }

  public forgetPassword() {
    const { resetPassword } = this.formReset.getRawValue();
    this.authService.resetPassword(resetPassword).subscribe({
      error: ({ code }) => this.showMessage(String(code)),
      complete: () => {
        this.showMessage('We sent you a link to reset your password');
      },
    });
  }

  private redirectToHomePage(): void {
    this.router.navigate(['/home']);
  }

  private showMessage(massage: string) {
    this.message.next(massage);
  }
}
