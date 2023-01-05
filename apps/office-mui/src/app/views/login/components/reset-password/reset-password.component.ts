import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@office-app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'office-app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  public form: FormGroup;
  public toggleShowPassword = true;
  public message: Subject<string> = new Subject();
  private oobCode: string;
  private componentDestroyed$: Subject<void> = new Subject();
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
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((params) => {
        if (!params) {
          this.router.navigate(['/login']);
        }
        this.oobCode = params['oobCode'];
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public isValidForm() {
    const { password, approvePassword } = this.form.getRawValue();
    return password !== approvePassword;
  }

  public onSubmit(): void {
    const { approvePassword } = this.form.getRawValue();
    this.authService
      .confirmPasswordReset(this.oobCode, approvePassword)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe({
        complete: () => this.router.navigate(['/login']),
        error: ({ code }) => this.showMessage(String(code)),
      });
  }

  private showMessage(massage: string) {
    this.message.next(massage);
  }
}
