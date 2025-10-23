import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpertService } from '../../../core/services/expert.service';
import { Expert } from '../../../core/models/expert.model';

@Component({
  selector: 'app-expert-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  expert: Expert | null = null;
  isLoading = true;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private expertService: ExpertService,
    private router: Router
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      yearsOfExperience: [0, [Validators.min(0)]],
      hourlyRate: [0, [Validators.min(0)]],
      bio: ['']
    });
  }

  loadProfile(): void {
    this.expertService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.expert = response.data;
          this.form.patchValue({
            firstName: this.expert?.firstName ?? '',
            lastName: this.expert?.lastName ?? '',
            email: this.expert?.email ?? '',
            phone: this.expert?.phone ?? '',
            yearsOfExperience: this.expert?.yearsOfExperience ?? 0,
            hourlyRate: this.expert?.hourlyRate ?? 0,
            bio: this.expert?.bio ?? ''
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSaving = true;
      this.expertService.updateProfile(this.form.value).subscribe({
        next: (response) => {
          this.isSaving = false;
          if (response.success) {
            this.expert = response.data || null;
            // Show success message
            console.log('Profile updated successfully');
          }
        },
        error: (error) => {
          this.isSaving = false;
          console.error('Error updating profile:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/expert/dashboard']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }
}