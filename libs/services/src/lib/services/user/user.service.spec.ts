import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../../../services/environments/environment';
import { getAuth, provideAuth, user } from '@angular/fire/auth';
import { imageMock } from '../../mocks/image.mock';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { PriorityEnum } from './../../enums/priority.enum';
import { TaskTypeEnum } from './../../enums/task-type.enum';

describe('UserService', () => {
  let userService: UserService;
  const userId = '0OEWKOnut9c7hVyuybm7v2Ts3Fb2';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
      ],
      declarations: [],
      providers: [],
    }).compileComponents();
    userService = TestBed.inject(UserService);
    userService.user = '0OEWKOnut9c7hVyuybm7v2Ts3Fb2';
  });

  it('should get profile image', (done) => {
    userService.getProfileImage().subscribe((result) => {
      expect(result).toEqual(imageMock);
      done();
    });
  });

  it('should upload profile image', (done) => {
    userService.addProfileImage(imageMock).subscribe((result) => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('should get user name', (done) => {
    userService.getUserName().subscribe((result) => {
      expect(result).toEqual('test1');
      done();
    });
  });

  it('should add ticket to database', (done) => {
    const ticketDetails = 'testDetails';
    const customerName = 'testName';
    const date = '01/01/2001';
    userService
      .addTicket(ticketDetails, customerName, date, PriorityEnum.LOW)
      .subscribe((result) => {
        expect(result).toBeUndefined();
        done();
      });
  });

  it('should add task to database', (done) => {
    const taskName = 'task';
    userService.addTask(taskName, TaskTypeEnum.NEW).subscribe((result) => {
      expect(result).toBeUndefined();
      done();
    });
  });

  it('should unresolved ticket to database', (done) => {
    const ticketName = 'test';
    const ticketNumber = 100;
    userService
      .addUnresolvedTicket(ticketName, ticketNumber)
      .subscribe((result) => {
        expect(result).toBeUndefined();
        done();
      });
  });
});
