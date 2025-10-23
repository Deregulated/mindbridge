import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  client: Client | null = null;
  isLoading = true;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
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
      company: [''],
      industry: [''],
      bio: ['']
    });
  }

  loadProfile(): void {
    this.clientService.getProfile().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.client = response.data;
          this.form.patchValue({
            firstName: this.client.firstName ?? '',
            lastName: this.client.lastName ?? '',
            email: this.client.email ?? '',
            phone: this.client.phone ?? '',
            company: this.client.company ?? '',
            industry: this.client.industry ?? '',
            bio: this.client.bio ?? ''
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
      this.clientService.updateProfile(this.form.value).subscribe({
        next: (response) => {
          this.isSaving = false;
          if (response.success) {
            this.client = response.data || null;
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
    this.router.navigate(['/client/dashboard']);
  }

  hasActiveSubscription(): boolean {
    return !!(this.client?.subscription?.active);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  getSubscriptionBadgeClass(type: string | undefined): string {
    if (!type) return 'badge-secondary';
    
    const badgeClasses: { [key: string]: string } = {
      basic: 'badge-primary',
      premium: 'badge-success',
      enterprise: 'badge-warning'
    };
    
    return badgeClasses[type] || 'badge-secondary';
  }
}