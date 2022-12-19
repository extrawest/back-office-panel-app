import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'office-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  toggleShowPassword = true;
  checked = false;

  constructor(private fb: FormBuilder) {
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
