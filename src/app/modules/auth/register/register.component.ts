import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <a routerLink="/" class="back-home">← Back to Home</a>
          <h1>Join MindBridge</h1>
          <p>Create your account and start your journey</p>
        </div>

        <div *ngIf="errorMessage" class="alert alert-error">
          {{ errorMessage }}
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName" class="form-label">First Name</label>
              <input
                id="firstName"
                type="text"
                formControlName="firstName"
                placeholder="Enter your first name"
                class="form-input">
            </div>

            <div class="form-group">
              <label for="lastName" class="form-label">Last Name</label>
              <input
                id="lastName"
                type="text"
                formControlName="lastName"
                placeholder="Enter your last name"
                class="form-input">
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="Enter your email"
              class="form-input">
          </div>

          <div class="form-group">
            <label class="form-label">I want to join as:</label>
            <div class="role-selection">
              <label class="role-option">
                <input type="radio" formControlName="role" value="client" class="radio">
                <div class="role-card">
                  <div class="role-icon">👤</div>
                  <div class="role-info">
                    <h4>Client</h4>
                    <p>Book sessions with experts</p>
                  </div>
                </div>
              </label>

              <label class="role-option">
                <input type="radio" formControlName="role" value="expert" class="radio">
                <div class="role-card">
                  <div class="role-icon">💼</div>
                  <div class="role-info">
                    <h4>Expert</h4>
                    <p>Share your knowledge</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                formControlName="password"
                placeholder="Create a password"
                class="form-input">
            </div>

            <div class="form-group">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                formControlName="confirmPassword"
                placeholder="Confirm your password"
                class="form-input">
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary register-btn"
            [disabled]="isLoading">
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="login-link">
          <p>Already have an account? <a routerLink="/auth/login" class="link">Sign in here</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.redirectToDashboard();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['client', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { confirmPassword, ...registerData } = this.registerForm.value;

      this.authService.register(registerData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.redirectToDashboard();
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
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
      }
    }
  }
}