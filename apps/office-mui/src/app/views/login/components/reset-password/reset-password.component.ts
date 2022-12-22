import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@office-app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'office-app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  form: FormGroup;
  toggleShowPassword = true;
  message: Subject<string> = new Subject();
  oobCode: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      approvePassword: ['', [Validators.required]],
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      if (!params) {
        this.router.navigate(['/login']);
      }
      this.oobCode = params['oobCode'];
    });
  }

  public isValidForm() {
    const { password, approvePassword } = this.form.getRawValue();
    return password !== approvePassword;
  }

  public onSubmit(): void {
    const { approvePassword } = this.form.getRawValue();
    this.authService
      .confirmPasswordReset(this.oobCode, approvePassword)
      .subscribe({
        complete: () => this.router.navigate(['/login']),
        error: ({ code }) => this.showMessage(String(code)),
      });
  }

  private showMessage(massage: string) {
    this.message.next(massage);
  }
}
