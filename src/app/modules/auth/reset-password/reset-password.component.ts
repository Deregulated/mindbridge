import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  token = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.createForm();
    this.token = this.route.snapshot.queryParams['token'] || '';
  }

  createForm(): FormGroup {
    return this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token) {
      this.isLoading = true;
      this.errorMessage = '';

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.isSubmitted = true;
        
        // Auto-redirect to login after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/auth/login'], {
            queryParams: { passwordReset: true }
          });
        }, 3000);
      }, 1500);
    } else if (!this.token) {
      this.errorMessage = 'Invalid or missing reset token.';
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  get formControls() {
    return this.resetPasswordForm.controls;
  }
}