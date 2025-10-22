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
  selector: 'app-expert-dashboard',
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
  expertName = 'Michael Chen';
  expertInitials = 'MC';
  notificationCount = 5;

  // Stats
  stats = [
    { value: 4, label: "Today's Sessions", icon: 'today' },
    { value: 24, label: 'Active Clients', icon: 'people' },
    { value: 4.9, label: 'Average Rating', icon: 'star' },
    { value: 3240, label: 'Monthly Revenue', icon: 'attach_money' }
  ];

  // Today's sessions
  todaysSessions = [
    {
      time: '9:00 AM',
      client: 'Sarah Johnson',
      type: 'Video Session',
      status: 'completed'
    },
    {
      time: '11:00 AM',
      client: 'David Wilson',
      type: 'Audio Session',
      status: 'upcoming'
    },
    {
      time: '2:00 PM',
      client: 'Emily Davis',
      type: 'Video Session',
      status: 'upcoming'
    },
    {
      time: '4:00 PM',
      client: 'Robert Brown',
      type: 'Video Session',
      status: 'upcoming'
    }
  ];

  // Recent clients
  recentClients = [
    {
      name: 'Sarah Johnson',
      lastSession: 'Jan 18',
      avatar: 'SJ'
    },
    {
      name: 'David Wilson',
      lastSession: 'Jan 17',
      avatar: 'DW'
    },
    {
      name: 'Emily Davis',
      lastSession: 'Jan 16',
      avatar: 'ED'
    }
  ];

  // Pending requests
  pendingRequests = [
    {
      clientName: 'Jennifer Lopez',
      requestedDate: 'Jan 19',
      type: 'Initial Consultation'
    },
    {
      clientName: 'Marcus Thompson',
      requestedDate: 'Jan 18',
      type: 'Therapy Session'
    }
  ];

  // Session analytics data
  sessionData = {
    labels: ['Jan 1-7', 'Jan 8-14', 'Jan 15-21'],
    data: [18, 22, 25]
  };

  sessionGrowth = 15;
  retentionRate = 92;

  // Action methods
  manageAvailability(): void {
    console.log('Manage availability clicked');
  }

  viewMessages(): void {
    console.log('View messages clicked');
  }

  addNotes(): void {
    console.log('Add notes clicked');
  }

  viewResources(): void {
    console.log('View resources clicked');
  }

  acceptRequest(request: any): void {
    console.log('Accept request:', request);
    // Remove from pending requests
    this.pendingRequests = this.pendingRequests.filter(r => r !== request);
  }

  declineRequest(request: any): void {
    console.log('Decline request:', request);
    // Remove from pending requests
    this.pendingRequests = this.pendingRequests.filter(r => r !== request);
  }
}