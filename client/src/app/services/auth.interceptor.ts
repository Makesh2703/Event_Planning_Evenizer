import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');

  if (token) {

    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  } else {
    return next(req);
  }
};


// import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
//   // Don't add the token for registration requests
//   if (req.url.includes('/register')) {
//     return next(req);
//   }

//   const token = localStorage.getItem('token');
//   if (token) {
//     const cloned = req.clone({
//       headers: req.headers.set('Authorization', `Bearer ${token}`)
//     });
//     return next(cloned);
//   } else {
//     return next(req);
//   }
// };