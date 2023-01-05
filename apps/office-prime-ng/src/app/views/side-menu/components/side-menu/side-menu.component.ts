import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@office-app/services/auth-service';
import { LocalStorageService } from '@office-app/services/local-storage-service';
import { Router } from '@angular/router';
import { UserService } from '@office-app/services/user-service';
import { environment } from './../../../../../environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { menuItems } from '@office-app/services/menu-items';

@Component({
  selector: 'office-app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnDestroy {
  public imageUrl: Subject<string> = new Subject<string>();
  public menuItems = menuItems;
  public userName: string;
  private componentDestroyed$: Subject<void> = new Subject();
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getImage();
    this.getUserName();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  public onLogout(): void {
    this.authService
      .signOut()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        if (this.localStorageService.hasValue('user')) {
          this.localStorageService.removeValue('user');
        }
        this.router.navigate(['/login']);
      });
  }

  public uploadPhoto(event: any): void {
    const file = event.currentFiles[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imageUrl.next(reader.result);
          this.userService
            .addProfileImage(reader.result)
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe();
        }
      };
    }
    this.userService.uploadFile(file, environment.firebaseConfig);
  }

  private getImage(): void {
    this.userService
      .getProfileImage()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((val) => {
        this.imageUrl.next(val);
      });
  }

  private getUserName(): void {
    this.userService
      .getUserName()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((name) => {
        this.userName = name;
      });
  }
}
