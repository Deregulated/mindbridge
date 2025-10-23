import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotPasswordForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const email = this.forgotPasswordForm.value.email;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.successMessage = `Password reset instructions have been sent to ${email}. Please check your email.`;
        
        console.log('Password reset requested for:', email);
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.forgotPasswordForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  getEmailError(): string {
    const emailControl = this.formControls['email'];
    if (emailControl.touched && emailControl.errors) {
      if (emailControl.errors['required']) return 'Email is required';
      if (emailControl.errors['email']) return 'Please enter a valid email address';
    }
    return '';
  }
}