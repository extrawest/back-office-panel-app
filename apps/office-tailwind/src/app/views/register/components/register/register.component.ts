import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@office-app/services/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'office-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  public form: FormGroup;
  public toggleShowPassword = true;
  private registerSubscription: Subscription | undefined;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  public isValidForm(): boolean {
    return this.form.invalid || this.form.pristine;
  }

  public onSubmit() {
    const { name, email, password } = this.form.getRawValue();
    this.registerSubscription = this.authService.register(
      email,
      password,
      name
    );
  }
}
