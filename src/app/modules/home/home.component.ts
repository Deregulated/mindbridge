import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      icon: 'verified_user',
      title: 'Secure & Confidential',
      description: 'Your privacy is our priority. All sessions are encrypted and completely confidential.'
    },
    {
      icon: 'schedule',
      title: '24/7 Availability',
      description: 'Access support whenever you need it. Our platform is available round the clock.'
    },
    {
      icon: 'diversity',
      title: 'Expert Professionals',
      description: 'Connect with licensed mental health experts specialized in various therapeutic approaches.'
    },
    {
      icon: 'devices',
      title: 'Anywhere Access',
      description: 'Use MindBridge on any device - desktop, tablet, or mobile for seamless support.'
    }
  ];

  testimonials = [
    {
      name: 'Sarah M.',
      role: 'Client',
      content: 'MindBridge helped me find the perfect therapist. The sessions have been life-changing.',
      avatar: '👩'
    },
    {
      name: 'Dr. James R.',
      role: 'Therapist',
      content: 'A wonderful platform that makes mental health support accessible to everyone.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Alex T.',
      role: 'Client',
      content: 'The convenience of online sessions made it easy for me to prioritize my mental health.',
      avatar: '🧑'
    }
  ];
}