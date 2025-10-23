import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '../fa-icon/fa-icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent],
  template: `
    <footer class="footer" role="contentinfo">
      <div class="footer-main">
        <div class="container">
          <div class="footer-content">
            <!-- Brand Section -->
            <div class="footer-section brand-section">
              <div class="footer-logo">
                <app-fa-icon 
                  icon="brain" 
                  size="lg" 
                  color="#4f46e5"
                  ariaLabel="MindBridge Logo">
                </app-fa-icon>
                <div class="brand-text">
                  <span class="brand-name">MindBridge</span>
                  <span class="brand-tagline">Connecting Minds, Building Futures</span>
                </div>
              </div>
              <p class="footer-description">
                Empowering individuals through expert guidance and meaningful connections. 
                Join thousands who are transforming their lives with MindBridge.
              </p>
              <div class="social-links">
                <a 
                  href="#" 
                  class="social-link" 
                  aria-label="Follow us on Facebook"
                  (click)="trackSocialClick('facebook')">
                  <app-fa-icon icon="facebook" stylePrefix="fab"></app-fa-icon>
                </a>
                <a 
                  href="#" 
                  class="social-link" 
                  aria-label="Follow us on Twitter"
                  (click)="trackSocialClick('twitter')">
                  <app-fa-icon icon="twitter" stylePrefix="fab"></app-fa-icon>
                </a>
                <a 
                  href="#" 
                  class="social-link" 
                  aria-label="Follow us on LinkedIn"
                  (click)="trackSocialClick('linkedin')">
                  <app-fa-icon icon="linkedin" stylePrefix="fab"></app-fa-icon>
                </a>
                <a 
                  href="#" 
                  class="social-link" 
                  aria-label="Follow us on Instagram"
                  (click)="trackSocialClick('instagram')">
                  <app-fa-icon icon="instagram" stylePrefix="fab"></app-fa-icon>
                </a>
                <a 
                  href="#" 
                  class="social-link" 
                  aria-label="Subscribe on YouTube"
                  (click)="trackSocialClick('youtube')">
                  <app-fa-icon icon="youtube" stylePrefix="fab"></app-fa-icon>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="footer-section">
              <h3 class="section-title">Platform</h3>
              <ul class="footer-links">
                <li>
                  <a routerLink="/" (click)="trackLinkClick('home')">
                    <app-fa-icon icon="home" size="sm"></app-fa-icon>
                    Home
                  </a>
                </li>
                <li>
                  <a routerLink="/about" (click)="trackLinkClick('about')">
                    <app-fa-icon icon="info-circle" size="sm"></app-fa-icon>
                    About Us
                  </a>
                </li>
                <li>
                  <a routerLink="/sessions" (click)="trackLinkClick('sessions')">
                    <app-fa-icon icon="calendar" size="sm"></app-fa-icon>
                    Sessions
                  </a>
                </li>
                <li>
                  <a routerLink="/experts" (click)="trackLinkClick('experts')">
                    <app-fa-icon icon="users" size="sm"></app-fa-icon>
                    Find Experts
                  </a>
                </li>
                <li>
                  <a routerLink="/pricing" (click)="trackLinkClick('pricing')">
                    <app-fa-icon icon="tag" size="sm"></app-fa-icon>
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <!-- Resources -->
            <div class="footer-section">
              <h3 class="section-title">Resources</h3>
              <ul class="footer-links">
                <li>
                  <a href="#" (click)="trackLinkClick('help-center')">
                    <app-fa-icon icon="life-ring" size="sm"></app-fa-icon>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" (click)="trackLinkClick('blog')">
                    <app-fa-icon icon="blog" size="sm"></app-fa-icon>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" (click)="trackLinkClick('tutorials')">
                    <app-fa-icon icon="video" size="sm"></app-fa-icon>
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" (click)="trackLinkClick('webinars')">
                    <app-fa-icon icon="chalkboard-teacher" size="sm"></app-fa-icon>
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" (click)="trackLinkClick('community')">
                    <app-fa-icon icon="comments" size="sm"></app-fa-icon>
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <!-- Support -->
            <div class="footer-section">
              <h3 class="section-title">Support</h3>
              <ul class="footer-links">
                <li>
                  <a href="#" (click)="trackLinkClick('contact')">
                    <app-fa-icon icon="headset" size="sm"></app-fa-icon>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" (click)="trackLinkClick('faq')">
                    <app-fa-icon icon="question-circle" size="sm"></app-fa-icon>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" (click)="trackLinkClick('status')">
                    <app-fa-icon icon="signal" size="sm"></app-fa-icon>
                    System Status
                  </a>
                </li>
                <li>
                  <a href="#" (click)="trackLinkClick('feedback')">
                    <app-fa-icon icon="comment-dots" size="sm"></app-fa-icon>
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="#" (click)="trackLinkClick('report')">
                    <app-fa-icon icon="flag" size="sm"></app-fa-icon>
                    Report Issue
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact & Newsletter -->
            <div class="footer-section contact-section">
              <h3 class="section-title">Stay Connected</h3>
              <div class="contact-info">
                <div class="contact-item">
                  <app-fa-icon icon="envelope" class="contact-icon"></app-fa-icon>
                  <div>
                    <span class="contact-label">Email</span>
                    <a href="mailto:support@mindbridge.com" class="contact-value">
                      support&#64;mindbridge.com
                    </a>
                  </div>
                </div>
                <div class="contact-item">
                  <app-fa-icon icon="phone" class="contact-icon"></app-fa-icon>
                  <div>
                    <span class="contact-label">Phone</span>
                    <a href="tel:+15551234567" class="contact-value">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div class="contact-item">
                  <app-fa-icon icon="map-marker-alt" class="contact-icon"></app-fa-icon>
                  <div>
                    <span class="contact-label">Office</span>
                    <span class="contact-value">123 Innovation Drive, Tech City</span>
                  </div>
                </div>
              </div>

              <!-- Newsletter Signup -->
              <div class="newsletter">
                <h4 class="newsletter-title">Get Updates</h4>
                <p class="newsletter-description">
                  Stay informed about new features and expert insights.
                </p>
                <div class="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    aria-label="Enter your email for newsletter"
                    class="newsletter-input">
                  <button 
                    class="newsletter-btn"
                    aria-label="Subscribe to newsletter">
                    <app-fa-icon icon="paper-plane"></app-fa-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-content">
            <div class="copyright">
              <p>&copy; 2024 MindBridge Technologies Inc. All rights reserved.</p>
            </div>
            
            <div class="footer-bottom-links">
              <a 
                href="#" 
                (click)="trackLinkClick('privacy')"
                class="legal-link">
                Privacy Policy
              </a>
              <a 
                href="#" 
                (click)="trackLinkClick('terms')"
                class="legal-link">
                Terms of Service
              </a>
              <a 
                href="#" 
                (click)="trackLinkClick('cookies')"
                class="legal-link">
                Cookie Policy
              </a>
              <a 
                href="#" 
                (click)="trackLinkClick('security')"
                class="legal-link">
                Security
              </a>
              <a 
                href="#" 
                (click)="trackLinkClick('sitemap')"
                class="legal-link">
                Sitemap
              </a>
            </div>

            <div class="footer-credits">
              <span class="credit-text">
                Made with 
                <app-fa-icon icon="heart" class="heart-icon"></app-fa-icon> 
                for the community
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Top Button -->
      <button 
        class="back-to-top"
        (click)="scrollToTop()"
        aria-label="Scroll back to top">
        <app-fa-icon icon="chevron-up"></app-fa-icon>
      </button>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  trackSocialClick(platform: string): void {
    // Analytics tracking would go here
    console.log(`Social link clicked: ${platform}`);
  }

  trackLinkClick(link: string): void {
    // Analytics tracking would go here
    console.log(`Footer link clicked: ${link}`);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}