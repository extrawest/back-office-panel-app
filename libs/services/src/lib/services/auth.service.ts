import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from '@angular/fire/auth';
import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
} from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly auth: Auth,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public register(email: string, password: string, userName: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  public signInWithGoogle() {
    return this.authLogin(new GoogleAuthProvider());
  }

  public signInWithFacebook() {
    return this.authLogin(new FacebookAuthProvider());
  }

  public resetPassword(email: string) {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  public confirmPasswordReset(oobCode: string, newPassword: string) {
    return from(confirmPasswordReset(this.auth, oobCode, newPassword));
  }

  private logInWithPopup(provider: any) {
    return signInWithPopup(this.auth, provider);
  }

  private getAuthProvider(provider: string) {
    if (provider === 'google.com') {
      return new GoogleAuthProvider();
    } else {
      return new FacebookAuthProvider();
    }
  }

  private authLogin(provider: any) {
    from(this.logInWithPopup(provider)).subscribe({
      complete: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        const code = error.code;
        if (code === 'auth/account-exists-with-different-credential') {
          fetchSignInMethodsForEmail(this.auth, error.customData.email).then(
            (result) => {
              const provider = this.getAuthProvider(result[0]);
              this.logInWithPopup(provider).then(() => {
                onAuthStateChanged(this.auth, (user) => {
                  if (user) {
                    this.router.navigateByUrl('/');
                  }
                });
              });
            }
          );
        }
      },
    });
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth));
  }
}
