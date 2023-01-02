import { Component, OnInit } from '@angular/core';
import { AuthService } from '@office-app/services/auth-service';
import { LocalStorageService } from '@office-app/services/local-storage-service';
import { Router } from '@angular/router';
import { UserService } from '@office-app/services/user-service';
import { environment } from './../../../../../environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'office-app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  menuItems = [
    {
      name: 'Dashboard',
      url: '/home/dashboard',
      image: './assets/icons/info-icon.png',
    },
    {
      name: 'Team',
      image: './assets/icons/team-icon.png',
    },
    {
      name: 'Offers',
      image: './assets/icons/offer-icon.png',
    },
    {
      name: 'Partners',
      image: './assets/icons/call-center-icon.png',
    },
    {
      name: 'Finances',
      image: './assets/icons/finance-icon.png',
    },
    {
      name: 'Clients',
      url: '/home/clients',
      image: './assets/icons/man-icon.png',
    },
  ];
  imageUrl: Subject<string> = new Subject<string>();
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
    const file = event.target.files[0];
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
