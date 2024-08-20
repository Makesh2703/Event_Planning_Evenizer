// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

// import { User,Credentials,AuthResponse } from '../../models/user.model';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule,HttpClientModule]
// })
// export class LoginComponent {
//   credentials: Credentials = { username: '', password: '' };

//   constructor(private authService: AuthService, private router: Router) {}

//   login() {
//     this.authService.login(this.credentials).subscribe(
//       (response: AuthResponse) => {
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('userId', response.userId);
//         // localStorage.setItem('username',response.username);
//         console.log(response.userId);

//         // Navigate based on the user's role
//         switch (response.role) {
//           case 'PLANNER':
//             this.router.navigate(['planner-dashboard']);
//             break;
//           case 'CLIENT':
//             this.router.navigate(['/client-dashboard']);
//             break;
//           case 'STAFF':
//             this.router.navigate(['/staff-dashboard']);
//             break;
//           default:
//             console.error('Unknown user role:', response.role);
//             break;
//         }

//       },
//       error => {
//         console.error('Login error:', error);
//       }
//     );
//   }
//   goToRegister() {
//     this.router.navigate(['/register']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
 
import { User, Credentials, AuthResponse } from '../../models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
 
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }
 
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
 
  login() {
    if (this.loginForm.valid) {
      const credentials: Credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe(
        (response: AuthResponse) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
 
          console.log(response.userId);
 
          // Navigate based on the user's role
          switch (response.role) {
            case 'PLANNER':
              this.router.navigate(['/planner-dashboard']);
              break;
            case 'CLIENT':
              this.router.navigate(['/client-dashboard']);
              break;
            case 'STAFF':
              this.router.navigate(['/staff-dashboard']);
              break;
            default:
              console.error('Unknown user role:', response.role);
              break;
          }
        },
        // error => {
        //   console.error('Login error:', error);
        // }
      );
    }
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}