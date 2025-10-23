import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';
import { Session } from '../../../core/models/session.model';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="client-dashboard">
      <div class="dashboard-header">
        <div class="header-content">
          <h1>Client Dashboard</h1>
          <p>Welcome back! Here's your overview.</p>
        </div>
        <div class="header-actions">
          <button routerLink="/client/sessions" class="btn btn-primary">
            Book New Session
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-info">
            <h3>12</h3>
            <p>Total Sessions</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-info">
            <h3>3</h3>
            <p>Upcoming</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <h3>9</h3>
            <p>Completed</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <h3>4.8/5</h3>
            <p>Expert Rating</p>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="content-section">
          <h2>Upcoming Sessions</h2>
          <div class="sessions-list">
            <div class="session-card">
              <div class="session-info">
                <h4>Career Guidance</h4>
                <p>with Dr. Sarah Smith</p>
                <p class="session-date">Jan 15, 2024 at 10:00 AM</p>
                <p class="session-duration">60 minutes</p>
              </div>
              <div class="session-actions">
                <button class="btn btn-primary">Join Session</button>
                <button class="btn btn-outline">Reschedule</button>
              </div>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h2>Quick Actions</h2>
          <div class="quick-actions">
            <button routerLink="/client/sessions" class="action-card">
              <div class="action-icon">🔍</div>
              <h4>Find Experts</h4>
              <p>Browse and book sessions</p>
            </button>
            
            <button routerLink="/client/profile" class="action-card">
              <div class="action-icon">👤</div>
              <h4>Update Profile</h4>
              <p>Manage your information</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  upcomingSessions: Session[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessionService.getSessions().subscribe({
      next: (response) => {
        if (response.success) {
          this.upcomingSessions = response.data ?? [];
        }
      }
    });
  }
}