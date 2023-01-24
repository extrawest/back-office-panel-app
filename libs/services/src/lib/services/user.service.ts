import { Injectable } from '@angular/core';
import { throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  getDatabase,
  ref as fbRef,
  update,
  child,
  push,
  get,
} from 'firebase/database';
import { LocalStorageService } from './local-storage.service';
import { getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { initializeApp } from '@angular/fire/app';
import { Ticket } from './../interfaces/ticket.interface';
import { PriorityEnum } from './../enums/priority.enum';
import { Task } from '../interfaces/task.interface';
import { TaskTypeEnum } from './../enums/task-type.enum';

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

  addTicket(
    ticketDetails: string,
    customerName: string,
    date: string,
    priority: PriorityEnum
  ) {
    const ticket: Ticket = {
      ticketDetails: ticketDetails,
      customerName: customerName,
      date: date,
      priority: priority,
    };
    const ticketId = push(
      fbRef(getDatabase(), `users/` + this.user + '/tickets'),
      ticket
    ).key;
    ticket['ticketId'] = ticketId!;
    return from(
      update(
        fbRef(getDatabase(), `users/` + this.user + '/tickets/' + ticketId),
        ticket
      )
    );
  }

  getUserTickets() {
    return from(
      get(child(fbRef(getDatabase()), 'users/' + this.user + '/tickets'))
    ).pipe(
      map((data) => data.val()),
      catchError((error) => throwError(() => error))
    );
  }

  getUserName() {
    return from(
      get(child(fbRef(getDatabase()), 'users/' + this.user + '/userName'))
    ).pipe(
      map((data: any) => data.val()),
      catchError((error) => throwError(() => error))
    );
  }

  addTask(taskName: string, taskStatus: TaskTypeEnum) {
    const task: Task = {
      taskName: taskName,
      taskStatus: taskStatus,
    };
    const taskId = push(
      fbRef(getDatabase(), `users/` + this.user + '/tasks'),
      task
    ).key;
    task['taskId'] = taskId!;
    return from(
      update(
        fbRef(getDatabase(), `users/` + this.user + '/tasks/' + taskId),
        task
      )
    );
  }

  getUserTasks() {
    return from(
      get(child(fbRef(getDatabase()), 'users/' + this.user + '/tasks'))
    ).pipe(
      map((data) => data.val()),
      catchError((error) => throwError(() => error))
    );
  }
}
