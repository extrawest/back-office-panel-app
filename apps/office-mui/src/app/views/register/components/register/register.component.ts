import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '@office-app/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'office-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  toggleShowPassword = true;
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
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
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public isValidForm(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  public onSubmit() {
    const { name, email, password } = this.form.getRawValue();
    this.authService.register(email, password, name).subscribe({
      error: ({ code }) => this.showErrorMessage(String(code)),
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }

  private showErrorMessage(error: string) {
    this.errorMessage = error;
  }
}
