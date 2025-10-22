import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // Material modules
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userName = 'Sarah Johnson';
  notificationCount = 3;

  stats = [
    { value: 2, label: 'Upcoming Sessions', icon: 'event_available' },
    { value: 12, label: 'Completed Sessions', icon: 'check_circle' },
    { value: 75, label: 'Wellness Progress', icon: 'trending_up' },
    { value: 8, label: 'Resources', icon: 'menu_book' }
  ];

  upcomingSessions = [
    { time: '2:00 PM', expert: 'Dr. Michael Chen', type: 'Video Session' },
    { time: '10:00 AM', expert: 'Dr. Emily Rodriguez', type: 'Audio Session' }
  ];
}