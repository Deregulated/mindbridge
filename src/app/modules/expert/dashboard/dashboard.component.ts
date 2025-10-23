import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expert-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="expert-dashboard">
      <div class="dashboard-header">
        <div class="header-content">
          <h1>Expert Dashboard</h1>
          <p>Welcome back! Manage your sessions and track your performance.</p>
        </div>
        <div class="header-actions">
          <button routerLink="/expert/profile" class="btn btn-primary">
            Update Availability
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-info">
            <h3>45</h3>
            <p>Total Sessions</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <div class="stat-info">
            <h3>3</h3>
            <p>Pending</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <h3>4.9/5</h3>
            <p>Client Rating</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <h3>$2,340</h3>
            <p>Earnings</p>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="content-section">
          <h2>Today's Sessions</h2>
          <div class="sessions-list">
            <div class="session-card">
              <div class="session-info">
                <h4>Career Guidance</h4>
                <p>with Alice Johnson</p>
                <p class="session-date">Jan 15, 2024 at 10:00 AM</p>
                <p class="session-duration">60 minutes</p>
              </div>
              <div class="session-actions">
                <button class="btn btn-primary">Start Session</button>
                <button class="btn btn-outline">Reschedule</button>
              </div>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h2>Quick Actions</h2>
          <div class="quick-actions">
            <button routerLink="/expert/profile" class="action-card">
              <div class="action-icon">⏰</div>
              <h4>Set Availability</h4>
              <p>Manage your working hours</p>
            </button>
            
            <button class="action-card">
              <div class="action-icon">💼</div>
              <h4>Update Profile</h4>
              <p>Edit your expertise</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}