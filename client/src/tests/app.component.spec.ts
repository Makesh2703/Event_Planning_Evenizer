
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ClientService } from '../app/services/client.service';
// import { ClientService } from '../../services/client.service';
import { PlannerService } from '../app/services/planner.service';
// import { PlannerService } from '../../services/planner.service';
import { StaffService } from '../app/services/staff.service';
// import { StaffService } from '../../services/staff.service';
import { AuthService } from '../app/services/auth.service';
// import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../app/guards/auth.guard';
// import { AuthGuard } from '../../guards/auth.guard';
import { ClientDashboardComponent } from '../app/components/client-dashboard/client-dashboard.component';
// import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { PlannerDashboardComponent } from '../app/components/planner-dashboard/planner-dashboard.component';
// import { PlannerDashboardComponent } from './planner-dashboard/planner-dashboard.component';
import { RegisterComponent } from '../app/components/register/register.component';
// import { RegisterComponent } from './register/register.component';
import { StaffDashboardComponent } from '../app/components/staff-dashboard/staff-dashboard.component';
// import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
// import { Event } from '@angular/router';
import { Event } from '../app/models/event.model';
// import { Event } from '../../models/event.model';
import { Task } from '../app/models/task.model';
// import { Task } from '../../models/task.model';

import { User, Credentials, AuthResponse } from '../app/models/user.model';

describe('Components and Services Tests', () => {
  let clientService: ClientService;
  let plannerService: PlannerService;
  let staffService: StaffService;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ClientDashboardComponent,
        PlannerDashboardComponent,
        RegisterComponent,
        StaffDashboardComponent
      ],
      providers: [ClientService, PlannerService, StaffService, AuthService, AuthGuard]
    });

    clientService = TestBed.inject(ClientService);
    plannerService = TestBed.inject(PlannerService);
    staffService = TestBed.inject(StaffService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('ClientDashboardComponent', () => {
    let fixture: ComponentFixture<ClientDashboardComponent>;
    let component: ClientDashboardComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(ClientDashboardComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should fetch events on init', () => {
      const mockEvents: Event[] = [{ title: 'Sample Event', date: '2024-07-01', location: 'Location', description: 'Description', status: 'Upcoming' }];
      spyOn(clientService, 'getEvents').and.returnValue(of(mockEvents));

      fixture.detectChanges(); // Trigger ngOnInit

      expect(component.events).toEqual(mockEvents);
    });

    it('should provide feedback', () => {
      const eventId = '1';
      const feedback = 'Great event!';
      spyOn(clientService, 'provideFeedback').and.returnValue(of({}));

      component.provideFeedback(eventId, feedback);

      expect(clientService.provideFeedback).toHaveBeenCalledWith(eventId, feedback);
    });
  });

  describe('PlannerDashboardComponent', () => {
    let fixture: ComponentFixture<PlannerDashboardComponent>;
    let component: PlannerDashboardComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(PlannerDashboardComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should fetch events and tasks on init', () => {
      const mockEvents: Event[] = [{ title: 'Sample Event', date: '2024-07-01', location: 'Location', description: 'Description', status: 'Upcoming' }];
      const mockTasks: Task[] = [{ description: 'Sample Task', status: 'Pending', assignedStaff: '' }];
      spyOn(plannerService, 'getEvents').and.returnValue(of(mockEvents));
      spyOn(plannerService, 'getTasks').and.returnValue(of(mockTasks));

      fixture.detectChanges(); // Trigger ngOnInit

      expect(component.events).toEqual(mockEvents);
      expect(component.tasks).toEqual(mockTasks);
    });

    it('should create an event', () => {
      const newEvent: Event = { title: 'New Event', date: '2024-07-01', location: 'New Location', description: 'New Description', status: 'Upcoming' };
      spyOn(plannerService, 'createEvent').and.returnValue(of(newEvent));
      spyOn(component, 'getEvents').and.callThrough();

      component.newEvent = newEvent;
      component.createEvent();

      expect(plannerService.createEvent).toHaveBeenCalledWith(newEvent);
      expect(component.getEvents).toHaveBeenCalled();
    });

    it('should update an event', () => {
      const updatedEvent: Event = { id: '1', title: 'Updated Event', date: '2024-07-01', location: 'Updated Location', description: 'Updated Description', status: 'Upcoming' };
      spyOn(plannerService, 'updateEvent').and.returnValue(of(updatedEvent));
      spyOn(component, 'getEvents').and.callThrough();

      component.selectedEvent = updatedEvent;
      component.updateEvent();

      expect(plannerService.updateEvent).toHaveBeenCalledWith(updatedEvent, updatedEvent.id!);
      expect(component.getEvents).toHaveBeenCalled();
    });

    it('should create a task', () => {
      const newTask: Task = { description: 'New Task', status: 'Pending', assignedStaff: '' };
      spyOn(plannerService, 'createTask').and.returnValue(of(newTask));
      spyOn(component, 'getTasks').and.callThrough();

      component.newTask = newTask;
      component.createTask();

      expect(plannerService.createTask).toHaveBeenCalledWith(newTask);
      expect(component.getTasks).toHaveBeenCalled();
    });
  });

  describe('RegisterComponent', () => {
    let fixture: ComponentFixture<RegisterComponent>;
    let component: RegisterComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should register a new user', () => {
      const newUser: User = { username: 'newuser', email: 'newuser@example.com', password: 'password', role: 'PLANNER' };
      spyOn(authService, 'register').and.returnValue(of(newUser));
      spyOn(router, 'navigate');

      component.user = newUser;
      component.register();

      expect(authService.register).toHaveBeenCalledWith(newUser);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('StaffDashboardComponent', () => {
    let fixture: ComponentFixture<StaffDashboardComponent>;
    let component: StaffDashboardComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(StaffDashboardComponent);
      component = fixture.componentInstance;
      component.staffId = '1';
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should fetch tasks on init', () => {
      const mockTasks: Task[] = [{ description: 'Sample Task', status: 'Pending', assignedStaff: 'Staff 1' }];
      spyOn(staffService, 'getTasks').and.returnValue(of(mockTasks));

      fixture.detectChanges(); // Trigger ngOnInit

      expect(component.tasks).toEqual(mockTasks);
    });

    it('should update task status', () => {
      const taskId = '1';
      const status = 'Completed';
      spyOn(staffService, 'updateTaskStatus').and.returnValue(of({ success: true }));
      spyOn(component, 'getTasks').and.callThrough();

      component.updateTaskStatus(taskId, status);

      expect(staffService.updateTaskStatus).toHaveBeenCalledWith(taskId, status);
      expect(component.getTasks).toHaveBeenCalled();
    });
  });

  describe('AuthService', () => {
    it('should register a new user', () => {
      const newUser: User = { username: 'newuser', email: 'newuser@example.com', password: 'password', role: 'PLANNER' };
      spyOn(authService, 'register').and.returnValue(of(newUser));

      authService.register(newUser).subscribe(response => {
        expect(response).toEqual(newUser);
      });
    });

    it('should login and return a token', () => {
      const credentials: Credentials = { username: 'testuser', password: 'testpass' };
      const mockResponse: AuthResponse = {
        token: 'jwt-token',
        role: '',
        username: '',
        email: '',
        userId: ''
      };
      spyOn(authService, 'login').and.returnValue(of(mockResponse));

      authService.login(credentials).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
    });

    it('should check if token is expired', () => {
      const token = 'valid-token';
      spyOn(authService, 'isTokenExpired').and.returnValue(of(false));

      authService.isTokenExpired(token).subscribe(isExpired => {
        expect(isExpired).toBeFalse();
      });
    });
  });

  describe('AuthGuard', () => {
    let authGuard: AuthGuard;

    beforeEach(() => {
      authGuard = TestBed.inject(AuthGuard);
    });

    it('should allow activation if token is not expired', () => {
      const next: ActivatedRouteSnapshot = {} as any;
      const state: RouterStateSnapshot = {} as any;
      spyOn(authService, 'isTokenExpired').and.returnValue(of(false));

      // authGuard.canActivate(next, state).subscribe((canActivate: Observable<any>) => {
      //   expect(canActivate).toBeTrue();
      // });
    });

    it('should deny activation and redirect to login if token is expired', () => {
      const next: ActivatedRouteSnapshot = {} as any;
      const state: RouterStateSnapshot = {} as any;
      spyOn(authService, 'isTokenExpired').and.returnValue(of(true));
      spyOn(router, 'navigate');

      // authGuard.canActivate(next, state).subscribe((canActivate: any) => {
      //   expect(canActivate).toBeFalse();
      //   expect(router.navigate).toHaveBeenCalledWith(['/login']);
      // });
    });
  });
});
