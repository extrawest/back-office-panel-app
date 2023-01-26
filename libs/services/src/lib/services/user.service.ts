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
import { UnresolvedTicket } from '../interfaces/unresolved-ticket.interface';
import { Graph } from '../interfaces/graph.interface';

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

  addUnresolvedTicket(
    ticketName: string,
    ticketNumber: number
  ) {
    const ticket: UnresolvedTicket = {
      ticketName: ticketName,
      ticketNumber: ticketNumber
    };
    const ticketId = push(
      fbRef(getDatabase(), `users/` + this.user + '/unresolvedTickets'),
      ticket
    ).key;
    ticket['ticketId'] = ticketId!;
    return from(
      update(
        fbRef(getDatabase(), `users/` + this.user + '/unresolvedTickets/' + ticketId),
        ticket
      )
    );
  }

  getUserUnresolvedTickets() {
    return from(
      get(child(fbRef(getDatabase()), 'users/' + this.user + '/unresolvedTickets'))
    ).pipe(
      map((data) => data.val()),
      catchError((error) => throwError(() => error))
    );
  }


  addGraphData() {
    const graphData: Graph = {
      graphData: [820, 932, 901, 934, 1290, 1430, 1550, 1200, 1650, 1680],
    }
    const graphId = push(
      fbRef(getDatabase(), `users/` + this.user + '/graphData'),
      graphData
    ).key;
    graphData['graphId'] = graphId!;
    return from(
      update(
        fbRef(getDatabase(), `users/` + this.user + '/graphData/' + graphId),
        graphData
      )
    );
  }

  getGraphData() {
    return from(
      get(child(fbRef(getDatabase()), 'users/' + this.user + '/graphData'))
    ).pipe(
      map((data) => data.val()),
      catchError((error) => throwError(() => error))
    );
  }
}
