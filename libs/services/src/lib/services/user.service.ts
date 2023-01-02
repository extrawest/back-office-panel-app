import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  getDatabase,
  ref as fbRef,
  update,
  child,
  get,
} from 'firebase/database';
import { LocalStorageService } from './local-storage.service';
import { getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { initializeApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = this.localStorageService.getValue('user')?.slice(1, -1);
  constructor(private localStorageService: LocalStorageService) {}

  uploadFile(file: any, firebaseConfig: any) {
    const storageRef = ref(
      getStorage(initializeApp(firebaseConfig)),
      'images/' + file.name
    );
    uploadBytesResumable(storageRef, file);
  }

  addProfileImage(imageUrl: any) {
    const profileImage = {
      profileImage: imageUrl,
    };
    return from(
      update(fbRef(getDatabase(), `users/` + this.user), profileImage)
    );
  }

  getProfileImage() {
    return from(
      get(child(fbRef(getDatabase()), 'users/' + this.user + '/profileImage'))
    ).pipe(
      map((data: any) => data.val()),
      catchError((error) => throwError(() => error))
    );
  }
}
