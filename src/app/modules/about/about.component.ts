import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Clinical Officer',
      bio: 'Licensed clinical psychologist with 15+ years of experience in cognitive behavioral therapy.',
      avatar: '👩‍⚕️',
      specialty: 'Clinical Psychology'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CEO & Founder',
      bio: 'Passionate about making mental healthcare accessible through technology and innovation.',
      avatar: '👨‍💼',
      specialty: 'Healthcare Technology'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Head of Psychiatry',
      bio: 'Board-certified psychiatrist specializing in medication management and integrative care.',
      avatar: '👨‍⚕️',
      specialty: 'Psychiatry'
    },
    {
      name: 'Emily Thompson',
      role: 'Lead Therapist',
      bio: 'Licensed marriage and family therapist focused on relationship and family dynamics.',
      avatar: '👩‍🎓',
      specialty: 'Family Therapy'
    }
  ];

  values = [
    {
      icon: 'accessibility',
      title: 'Accessibility',
      description: 'Making quality mental health support available to everyone, everywhere.'
    },
    {
      icon: 'verified',
      title: 'Quality',
      description: 'Working only with licensed, experienced mental health professionals.'
    },
    {
      icon: 'security',
      title: 'Privacy',
      description: 'Ensuring complete confidentiality and data security for all our users.'
    },
    {
      icon: 'diversity',
      title: 'Inclusivity',
      description: 'Creating a welcoming environment for people from all backgrounds.'
    }
  ];
}