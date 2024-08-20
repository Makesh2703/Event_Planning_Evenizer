import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  private baseUrl = `${environment.apiUrl}/api/planner`;

  constructor(private http: HttpClient) {}

  createEvent(event: Event): Observable<Event> {
    const plannerId = localStorage.getItem('userId');
    return this.http.post<Event>(`${this.baseUrl}/event?plannerId=${plannerId}`, event);
  }

  updateEvent(event: Event, eventId: string): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/event/${eventId}`, event);
  }

  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/event/${eventId}`);
  }

  getEvents(): Observable<Event[]> {
    const plannerId = localStorage.getItem('userId');
    return this.http.get<Event[]>(`${this.baseUrl}/events?plannerId=${plannerId}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/task`, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }
  getEventsById(eventId:string):Observable<Event>{
    return this.http.get<Event>(`${this.baseUrl}/api/planner/event?eventId=${eventId}`);

  }

  assignTask(taskId: string, staffId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks/${taskId}/assign/${staffId}`, {});
  }
}
