import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private baseUrl = `${environment.apiUrl}/api/staff`;

  constructor(private http: HttpClient) { }

  getTasks(staffId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/${staffId}`);
  }
  getStaff(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`);

  }
  updateTaskStatus(taskId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${taskId}?status=${status}`, {});
  }

}
