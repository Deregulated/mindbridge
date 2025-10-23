import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  features = [
    {
      icon: 'fas fa-comments',  // Just the class names
      title: 'Expert Sessions',
      description: 'Connect with verified experts for personalized guidance and mentorship.'
    },
    {
      icon: 'fas fa-bullseye',
      title: 'Goal-Oriented', 
      description: 'Set clear objectives and track your progress with structured sessions.'
    },
    {
      icon: 'fas fa-sync',
      title: 'Flexible Scheduling',
      description: 'Book sessions at your convenience with our easy scheduling system.'
    },
    {
      icon: 'fas fa-key',
      title: 'Secure & Private',
      description: 'Your sessions and data are protected with enterprise-grade security.'
    }
  ];

  stats = [
    { number: '500+', label: 'Active Experts' },
    { number: '10K+', label: 'Sessions Completed' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' }
  ];
}