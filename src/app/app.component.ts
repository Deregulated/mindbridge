import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <!-- Simple navigation header -->
    <nav style="background: #f8f9fa; padding: 1rem; border-bottom: 1px solid #e0e0e0;">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <a routerLink="/home" style="font-size: 1.5rem; font-weight: bold; color: #667eea; text-decoration: none;">
          MindBridge
        </a>
        <div>
          <a routerLink="/home" style="margin: 0 1rem; color: #667eea; text-decoration: none;">Home</a>
          <a routerLink="/about" style="margin: 0 1rem; color: #667eea; text-decoration: none;">About</a>
          <a routerLink="/client/dashboard" style="margin: 0 1rem; color: #667eea; text-decoration: none;">Client</a>
          <a routerLink="/expert/dashboard" style="margin: 0 1rem; color: #667eea; text-decoration: none;">Expert</a>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <router-outlet></router-outlet>

    <!-- Debug info (remove in production) -->
    <div style="position: fixed; bottom: 10px; right: 10px; background: #f8f9fa; padding: 0.5rem; border-radius: 4px; font-size: 0.8rem; color: #666;">
      Angular App Loaded
    </div>
  `
})
export class AppComponent {
  constructor() {
    console.log('AppComponent initialized');
  }
}