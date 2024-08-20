import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { User,AuthResponse,Credentials } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/user`;

  constructor(private http: HttpClient) {}

 

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials);
  }

  isTokenExpired(token: string): Observable<boolean> {
    try {
     // const decodedToken: any = jwt_decode(token);
     // const expirationDate = new Date(decodedToken.exp * 1000);
      const isExpired = false;// expirationDate < new Date();
      return of(isExpired);
    } catch (error) {
      return of(true); // Token is invalid or some error occurred
    }
  }

  
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { environment } from '../../environments/environment';
// import { User, AuthResponse, Credentials } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl = `${environment.apiUrl}/api/user`;

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token || ''}`
//     });
//   }

//   register(user: User): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, user, { headers: this.getHeaders() });
//   }

//   login(credentials: Credentials): Observable<AuthResponse> {
//     return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
//       tap(response => {
//         if (response.token) {
//           localStorage.setItem('token', response.token);
//         }
//       })
//     );
//   }

//   isTokenExpired(): boolean {
//     const token = localStorage.getItem('token');
//     return !token; // Simple check - if token doesn't exist, consider it expired
//   }

//   getAllUsers(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/api/user/users`, { headers: this.getHeaders() });
//   }

//   logout() {
//     localStorage.removeItem('token');
//   }
// }