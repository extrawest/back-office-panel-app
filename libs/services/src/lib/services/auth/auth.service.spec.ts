import {
  TestBed
} from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../../../services/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      declarations: [],
      providers: [],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
  });

  const generateEmailAndPassword = () => {
    const randomString = () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const email = `${randomString()}@${randomString()}.test`;
    const password = randomString();
    const userName = randomString();
    return { email, password, userName };
  };

  it('should set item at local storage after register', (done) => {
    const { email, password, userName } = generateEmailAndPassword();
    authService.register(email, password, userName);
    expect(localStorage.getItem('user')?.length).toBeGreaterThan(0);
    done();
  });

  it('log users in', (done) => {
    authService.login('test3@test.com', 'test123').subscribe((result: any) => {
      expect(Object.keys(result)).toContain('user');
      done();
    });
  });

  it('should send email to reset password', (done) => {
    authService.resetPassword('test3@test.com').subscribe((result: any) => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('should log out', (done) => {
    authService.signOut().subscribe((result: any) => {
      expect(result).toBeUndefined();
      done();
    });
  });
});
