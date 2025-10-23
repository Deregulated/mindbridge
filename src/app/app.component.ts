import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ScreenReaderService } from './core/services/screen-reader.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AccessibilityPanelComponent } from './shared/components/accessibility-panel/accessibility-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent,
    AccessibilityPanelComponent
  ],
  template: `
    <!-- Skip to main content link -->
    <a 
      href="#main-content" 
      class="skip-link" 
      appFocusManager="skip-link"
      appAnnounce="Skip to main content link activated"
      announcePriority="polite"
      announceOn="click">
      Skip to main content
    </a>

    <!-- Header with Navigation -->
    <app-header></app-header>
    
    <!-- Main Content Area -->
    <main 
      id="main-content" 
      class="main-content" 
      role="main"
      tabindex="-1"
      appAnnounce="Main content loaded"
      announcePriority="polite"
      announceOn="load">
      <router-outlet></router-outlet>
    </main>
    
    <!-- Footer -->
    <app-footer></app-footer>

    <!-- Unified Accessibility Panel (Floats above chatbot) -->
    <app-accessibility-panel></app-accessibility-panel>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private screenReader: ScreenReaderService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setupRouterAnnouncements();
    this.setupKeyboardNavigation();
    this.setupReducedMotion();
  }

  private setupRouterAnnouncements(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const pageTitle = this.document.title || 'MindBridge';
        this.screenReader.announcePageTitle(pageTitle);
      });
  }

  private setupKeyboardNavigation(): void {
    // Enable keyboard navigation detection
    this.document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        this.document.body.classList.add('keyboard-nav');
      }
    });

    this.document.addEventListener('mousedown', () => {
      this.document.body.classList.remove('keyboard-nav');
    });

    this.document.addEventListener('touchstart', () => {
      this.document.body.classList.remove('keyboard-nav');
    });
  }

  private setupReducedMotion(): void {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      this.document.body.classList.add('reduced-motion');
    }

    // Listen for changes
    reducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        this.document.body.classList.add('reduced-motion');
      } else {
        this.document.body.classList.remove('reduced-motion');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}