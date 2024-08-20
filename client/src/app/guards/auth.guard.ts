import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let token=null;
      if (typeof localStorage !== 'undefined') {
     token= localStorage.getItem('token');
      }
    if (token) {
      console.log(token);
      return this.authService.isTokenExpired(token).pipe(
        map(isExpired => {
          if (!isExpired) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}


// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
//     if (typeof localStorage !== 'undefined') {
//       const token = localStorage.getItem('token');
//       if (token) {
//         if (!this.authService.isTokenExpired()) {
//           return true;
//         }
//       }
//     }
    
//     this.router.navigate(['/login']);
//     return false;
//   }
// }