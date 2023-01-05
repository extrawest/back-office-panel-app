import { Component } from '@angular/core';
import { AuthService } from '@office-app/services/auth-service';
import { LocalStorageService } from '@office-app/services/local-storage-service';
import { Router } from '@angular/router';
import { UserService } from '@office-app/services/user-service';
import { environment } from './../../../../../environments/environment';
import { Subject } from 'rxjs';
import { menuItems } from '@office-app/services/menu-items';

@Component({
  selector: 'office-app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  imageUrl: Subject<string> = new Subject<string>();
  menuItems = menuItems;
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getImage();
  }

  public onLogout(): void {
    this.authService.signOut().subscribe(() => {
      if (this.localStorageService.hasValue('user')) {
        this.localStorageService.removeValue('user');
      }
      this.router.navigate(['/login']);
    });
  }

  public uploadPhoto(event: any) {
    const file = event.currentFiles[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imageUrl.next(reader.result);
          this.userService.addProfileImage(reader.result).subscribe();
        }
      };
    }
    this.userService.uploadFile(file, environment.firebaseConfig);
  }

  public getImage() {
    this.userService.getProfileImage().subscribe((val) => {
      this.imageUrl.next(val);
    });
  }
}
