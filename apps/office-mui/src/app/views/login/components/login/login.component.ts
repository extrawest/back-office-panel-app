import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '@office-app/services/auth-service';
import { LocalStorageService } from '@office-app/services/local-storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'office-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  toggleShowPassword = true;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.matIconRegistry.addSvgIcon(
      'facebook-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/facebook-icon.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'google-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/icons/google-icon.svg'
      )
    );
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      check: [''],
    });
  }

  public isValidForm(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  public onSubmit() {
    const { name, password, check } = this.form.getRawValue();
    this.authService.login(name, password).subscribe({
      error: ({ code }) => this.showErrorMessage(String(code)),
      next: (user) => {
        if (user) {
          this.redirectToHomePage();
          if (check) {
            this.localStorageService.setValue(
              'user',
              JSON.stringify(user.user.uid)
            );
          }
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

  private redirectToHomePage(): void {
    this.router.navigate(['/']);
  }

  private showErrorMessage(error: string) {
    this.errorMessage = error;
  }
}
