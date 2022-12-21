import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
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

  public login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string, userName: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).subscribe((userCredential) => {
      this.localStorageService.setValue(
        'user',
        JSON.stringify(userCredential.user.uid)
      );
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.router.navigateByUrl('/home');
        }
      });
    });
  }

  public signInWithGoogle(): Observable<UserCredential> {
    return this.signInWithPopup(new GoogleAuthProvider());
  }

  public signInWithFacebook(): Observable<UserCredential> {
    return this.signInWithPopup(new FacebookAuthProvider());
  }

  private signInWithPopup(provider: AuthProvider): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, provider));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.auth));
  }
}
