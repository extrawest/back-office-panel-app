import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'office-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  toggleShowPassword = true;

  constructor(
    private fb: FormBuilder,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'facebook-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './../../../../../assets/icons/facebook-icon.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'google-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        './../../../../../assets/icons/google-icon.svg'
      )
    );
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      check: [''],
    });
  }

  isValidForm(): boolean {
    return this.form.invalid || this.form.pristine;
  }
}
