import { Component, inject } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
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
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  registerForm: FormGroup;
  selectedTab = 0;
  isLoading = false;
  errorMessage = '';

  tabs = [
    { label: 'Client Registration', value: 'client', icon: 'person' },
    { label: 'Expert Registration', value: 'expert', icon: 'medical_services' }
  ];

  constructor() {
    this.registerForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['client'],
      specialization: [''],
      licenseNumber: ['']
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value 
      ? null 
      : { passwordMismatch: true };
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
    const role = this.tabs[index].value;
    this.registerForm.patchValue({ role });
    
    // Update validators based on role
    const specialization = this.registerForm.get('specialization');
    const licenseNumber = this.registerForm.get('licenseNumber');
    
    if (role === 'expert') {
      specialization?.setValidators([Validators.required]);
      licenseNumber?.setValidators([Validators.required]);
    } else {
      specialization?.clearValidators();
      licenseNumber?.clearValidators();
    }
    
    specialization?.updateValueAndValidity();
    licenseNumber?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const userData = this.registerForm.value;
      
      // For demo purposes
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Registration successful! Welcome to MindBridge.', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.redirectUser(userData.role);
      }, 1500);
    }
  }

  private redirectUser(role: string): void {
    const route = role === 'client' ? '/client/dashboard' : '/expert/dashboard';
    this.router.navigate([route]);
  }
}