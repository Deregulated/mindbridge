import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1>Connect with Experts, Anytime, Anywhere</h1>
        <p class="hero-description">
          MindBridge is your gateway to professional guidance and personal growth. 
          Book sessions with verified experts in various fields and achieve your goals.
        </p>
        <div class="hero-actions">
          <a routerLink="/auth/register" class="btn btn-primary">Get Started</a>
          <a routerLink="/about" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <h2>Why Choose MindBridge?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Connect with Experts</h3>
            <p>Book sessions with experienced professionals in various fields.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-calendar"></i></div>
            <h3>Flexible Scheduling</h3>
            <p>Choose time slots that work best for your busy schedule.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><i class="fas fa-comments"></i></div>
            <h3>Live Chat Support</h3>
            <p>Communicate with experts through our secure chat system.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}