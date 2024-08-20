import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/api/client`;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/events`);
  }

  provideFeedback(eventId: string, feedback: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/event/${eventId}?feedback=${feedback}`, {});
  }

}
