
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  successMessage: string = '';
  isCreated: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), this.uniqueUsernameValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      role: ['PLANNER', Validators.required]  // Set 'PLANNER' as default
    });
  }

  // Custom validator for checking unique username
  uniqueUsernameValidator(userName: string): ValidationErrors | null {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (Array.isArray(users)) {
      const userNameArray = users.map((user: any) => user.username);
      if (userNameArray.includes(userName)) {
        return { notUnique: true };
      }
    }
    return null;
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!pattern.test(control.value)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  // Method to handle user registration
  // register() {
  //   if (this.registerForm.valid) {
  //     this.authService.register(this.registerForm.value).subscribe({
  //       next: (response) => {
  //         this.isCreated = true;
  //         this.successMessage = 'Registration successful';
  //       },
  //       error: (error) => {
  //         console.error('Registration failed', error);
  //       }
  //     });
  //   }
  // }
  // register() {
  //   if (this.registerForm.valid) {
  //     const usernameControl = this.registerForm.get('username');
  //       const usernameValue = usernameControl?.value;

  //       const uniqueUsernameError = this.uniqueUsernameValidator(usernameValue);

  //       if (uniqueUsernameError) {
  //         usernameControl?.setErrors(uniqueUsernameError);
  //         this.registerForm.markAllAsTouched();
  //         return;
  //       }
  //     const user: User = this.registerForm.value;
  //     this.authService.register(user).subscribe(
  //       response => {
  //         this.isCreated = true;
  //         this.successMessage = 'Registration successful';
  //       },
  //       error => {
  //         console.error('Registration error:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }


  isSubmitting = false;

  register() {
    if (this.registerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const user: User = this.registerForm.value;
      this.authService.register(user).subscribe({
        next: (response) => {
          this.isCreated = true;
          this.successMessage = 'Registration successful';
          // Optionally navigate to login page
          // this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          if (error.status === 409) {
            this.registerForm.get('username')?.setErrors({ 'usernameTaken': true });
          } else {
            // Handle other types of errors
            this.successMessage = 'Registration failed. Please try again.';
          }
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}