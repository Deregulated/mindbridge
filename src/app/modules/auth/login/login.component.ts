import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ValidationPatterns } from '../../../shared/utils/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
    // Get return url from route parameters or default to home
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // If user is already logged in, redirect to return url
    if (this.authService.isAuthenticated()) {
      this.redirectToDashboard();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(ValidationPatterns.EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.redirectToDashboard();
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please check your credentials and try again.';
          console.error('Login error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private redirectToDashboard(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      switch (user.role) {
        case 'client':
          this.router.navigate(['/client/dashboard']);
          break;
        case 'expert':
          this.router.navigate(['/expert/dashboard']);
          break;
        default:
          this.router.navigateByUrl(this.returnUrl);
      }
    } else {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get formControls() {
    return this.loginForm.controls;
  }

  getEmailError(): string {
    const emailControl = this.formControls['email'];
    if (emailControl.touched && emailControl.errors) {
      if (emailControl.errors['required']) return 'Email is required';
      if (emailControl.errors['pattern']) return 'Please enter a valid email address';
    }
    return '';
  }

  getPasswordError(): string {
    const passwordControl = this.formControls['password'];
    if (passwordControl.touched && passwordControl.errors) {
      if (passwordControl.errors['required']) return 'Password is required';
      if (passwordControl.errors['minlength']) return 'Password must be at least 6 characters';
    }
    return '';
  }

  // Demo login for testing - UPDATED to directly set user and redirect
  demoLogin(role: 'client' | 'expert'): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Create mock user data based on role
    const mockUser = {
      id: role === 'client' ? '1' : '2',
      email: role === 'client' ? 'client@demo.com' : 'expert@demo.com',
      firstName: 'Demo',
      lastName: role === 'client' ? 'Client' : 'Expert',
      role: role,
      isActive: true,
      emailVerified: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Set the user directly in auth service (bypass API call)
    this.authService.setCurrentUser(mockUser);
    
    // Simulate API delay
    setTimeout(() => {
      this.isLoading = false;
      this.redirectToDashboard();
    }, 1000);
  }
}