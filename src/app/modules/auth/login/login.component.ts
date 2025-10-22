import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loginForm: FormGroup;
  selectedTab = 0;
  isLoading = false;
  hidePassword = true;
  isMobile = false;

  // Tab configuration
  tabs = [
    { label: 'Client Login', value: 'client', icon: 'person' },
    { label: 'Expert Login', value: 'expert', icon: 'medical_services' }
  ];

  constructor() {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
    this.checkMobileView();
    window.addEventListener('resize', () => this.checkMobileView());
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
      role: ['client']
    });
  }

  private checkMobileView(): void {
    this.isMobile = window.innerWidth < 768;
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
    const role = this.tabs[index].value;
    this.loginForm.patchValue({ role });
  }

  getTabIcon(index: number): string {
    return this.tabs[index].icon;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    return emailControl?.hasError('email') ? 'Please enter a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    return passwordControl?.hasError('minlength') ? 'Password must be at least 6 characters' : '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;

      // For demo purposes, use demo login
      this.demoLogin(credentials.role as 'client' | 'expert');
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private redirectUser(role: string): void {
    const route = role === 'client' ? '/client/dashboard' : '/expert/dashboard';
    this.router.navigate([route]);
  }

  // Demo login for testing
  quickLogin(role: 'client' | 'expert'): void {
    this.isLoading = true;
    
    // Find tab index
    const tabIndex = this.tabs.findIndex(tab => tab.value === role);
    if (tabIndex !== -1) {
      this.selectedTab = tabIndex;
      this.loginForm.patchValue({ role });
    }

    this.demoLogin(role);
  }

  private demoLogin(role: 'client' | 'expert'): void {
    // Simulate API call with timeout
    setTimeout(() => {
      this.isLoading = false;
      
      const demoUser = role === 'client' 
        ? {
            id: '1',
            email: 'client@mindbridge.com',
            role: 'client',
            firstName: 'John',
            lastName: 'Client',
            avatar: '👤',
            isActive: true,
            createdAt: new Date()
          }
        : {
            id: '2', 
            email: 'expert@mindbridge.com',
            role: 'expert',
            firstName: 'Dr. Sarah',
            lastName: 'Expert',
            avatar: '👨‍⚕️',
            isActive: true,
            createdAt: new Date(),
            specialization: 'Clinical Psychology',
            licenseNumber: 'PSY12345',
            yearsOfExperience: 8,
            bio: 'Specialized in cognitive behavioral therapy',
            hourlyRate: 120,
            availability: []
          };

      // Create mock auth response
      const mockResponse = {
        token: `demo_token_${role}`,
        user: demoUser
      };

      // Store token and user
      localStorage.setItem('token', mockResponse.token);
      (this.authService as any).currentUserSubject.next(mockResponse.user);
      
      this.showSuccessMessage(`Welcome to MindBridge Demo, ${mockResponse.user.firstName}!`);
      this.redirectUser(mockResponse.user.role);
    }, 1000);
  }
}