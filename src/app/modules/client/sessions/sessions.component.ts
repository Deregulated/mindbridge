import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';
import { Session } from '../../../core/models/session.model';

@Component({
  selector: 'app-client-sessions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  sessions: Session[] = [];
  filteredSessions: Session[] = [];
  isLoading = true;
  activeFilter = 'all';
  
  filters = [
    { key: 'all', label: 'All Sessions' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' }
  ];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.sessions = [
        {
          id: '1',
          clientId: 'client1',
          expertId: 'expert1',
          expertName: 'Dr. Sarah Smith',
          scheduledDate: new Date('2024-01-15T10:00:00'),
          duration: 60,
          status: 'confirmed',
          topic: 'Career Guidance',
          notes: 'Discussion about career transition to tech industry',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        },
        {
          id: '2',
          clientId: 'client1',
          expertId: 'expert2',
          expertName: 'Prof. John Davis',
          scheduledDate: new Date('2024-01-18T14:00:00'),
          duration: 45,
          status: 'confirmed',
          topic: 'Skill Development',
          notes: 'Learning advanced JavaScript concepts',
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-05')
        },
        {
          id: '3',
          clientId: 'client1',
          expertId: 'expert3',
          expertName: 'Ms. Emily Wilson',
          scheduledDate: new Date('2024-01-10T11:00:00'),
          duration: 60,
          status: 'completed',
          topic: 'Business Strategy',
          rating: 5,
          feedback: 'Excellent session! Very insightful advice.',
          createdAt: new Date('2024-01-08'),
          updatedAt: new Date('2024-01-10')
        },
        {
          id: '4',
          clientId: 'client1',
          expertId: 'expert4',
          expertName: 'Mr. Michael Brown',
          scheduledDate: new Date('2024-01-12T16:00:00'),
          duration: 30,
          status: 'cancelled',
          topic: 'Leadership Skills',
          notes: 'Client rescheduled due to emergency',
          createdAt: new Date('2024-01-07'),
          updatedAt: new Date('2024-01-11')
        }
      ];

      this.applyFilter(this.activeFilter);
      this.isLoading = false;
    }, 1000);
  }

  applyFilter(filter: string): void {
    this.activeFilter = filter;
    
    switch (filter) {
      case 'upcoming':
        this.filteredSessions = this.sessions.filter(s => s.status === 'confirmed');
        break;
      case 'completed':
        this.filteredSessions = this.sessions.filter(s => s.status === 'completed');
        break;
      case 'cancelled':
        this.filteredSessions = this.sessions.filter(s => s.status === 'cancelled');
        break;
      default:
        this.filteredSessions = [...this.sessions];
    }
  }

  getSessionStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    return statusClasses[status] || 'status-confirmed';
  }

  joinSession(sessionId: string): void {
    console.log('Joining session:', sessionId);
    // Implement session joining logic
  }

  cancelSession(sessionId: string): void {
    console.log('Canceling session:', sessionId);
    // Implement session cancellation logic
  }

  rescheduleSession(sessionId: string): void {
    console.log('Rescheduling session:', sessionId);
    // Implement rescheduling logic
  }

  provideFeedback(sessionId: string): void {
    console.log('Providing feedback for session:', sessionId);
    // Implement feedback logic
  }

  getTotalSessions(): number {
    return this.sessions.length;
  }

  getUpcomingSessions(): number {
    return this.sessions.filter(s => s.status === 'confirmed').length;
  }

  getCompletedSessions(): number {
    return this.sessions.filter(s => s.status === 'completed').length;
  }
}