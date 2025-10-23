import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>MindBridge</h3>
          <p>Connecting clients with expert professionals for meaningful sessions.</p>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/about">About</a></li>
            <li><a routerLink="/auth/login">Login</a></li>
          </ul>
        </div>
        



        <div class="footer-section">
          <h4>Contact</h4>
          <p>Email: support&#64;mindbridge.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} MindBridge. All rights reserved.</p>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}