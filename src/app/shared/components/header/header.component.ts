import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '../fa-icon/fa-icon.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { ScreenReaderService } from '../../../core/services/screen-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent, ChatbotComponent],
  template: `
    <header class="header" role="banner">
      <div class="container">
        <!-- Logo -->
        <div class="logo">
          <a 
            routerLink="/" 
            aria-label="MindBridge Home"
            (click)="announceNavigation('Home')">
            <app-fa-icon 
              icon="brain" 
              size="lg" 
              color="#4f46e5"
              ariaLabel="MindBridge Logo"
              title="MindBridge Home">
            </app-fa-icon>
            <span class="brand-text">MindBridge</span>
          </a>
        </div>

        <!-- Main Navigation -->
        <nav class="nav" role="navigation" aria-label="Main navigation">
          <a 
            routerLink="/" 
            routerLinkActive="active"
            (click)="announceNavigation('Home')"
            aria-current="page">
            <app-fa-icon icon="home" ariaLabel="Home"></app-fa-icon>
            Home
          </a>
          <a 
            routerLink="/about" 
            routerLinkActive="active"
            (click)="announceNavigation('About')">
            <app-fa-icon icon="info-circle" ariaLabel="About"></app-fa-icon>
            About
          </a>
          <a 
            routerLink="/auth/login" 
            routerLinkActive="active"
            (click)="announceNavigation('Login')">
            <app-fa-icon icon="sign-in-alt" ariaLabel="Login"></app-fa-icon>
            Login
          </a>
          <a 
            routerLink="/auth/register" 
            routerLinkActive="active"
            (click)="announceNavigation('Register')">
            <app-fa-icon icon="user-plus" ariaLabel="Register"></app-fa-icon>
            Register
          </a>
        </nav>

        <!-- Header Controls -->
        <div class="header-controls">
          <!-- Chatbot Toggle -->
          <button 
            class="control-btn chatbot-header-btn"
            (click)="toggleChatbot()"
            [attr.aria-label]="'Open chatbot'"
            [attr.aria-expanded]="chatbotOpen">
            <app-fa-icon 
              icon="robot" 
              [title]="chatbotOpen ? 'Close chatbot' : 'Open chatbot'">
            </app-fa-icon>
          </button>

          <!-- Mobile Menu Toggle -->
          <button 
            class="mobile-menu-toggle"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="mobileMenuOpen"
            aria-label="Toggle mobile menu">
            <app-fa-icon 
              [icon]="mobileMenuOpen ? 'times' : 'bars'"
              [title]="mobileMenuOpen ? 'Close menu' : 'Open menu'">
            </app-fa-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        class="mobile-menu" 
        [class.open]="mobileMenuOpen" 
        *ngIf="mobileMenuOpen"
        role="navigation" 
        aria-label="Mobile navigation">
        <nav>
          <ul>
            <li>
              <a 
                routerLink="/" 
                (click)="closeMobileMenu()"
                (keydown.enter)="closeMobileMenu()">
                <app-fa-icon icon="home"></app-fa-icon>
                Home
              </a>
            </li>
            <li>
              <a 
                routerLink="/about" 
                (click)="closeMobileMenu()"
                (keydown.enter)="closeMobileMenu()">
                <app-fa-icon icon="info-circle"></app-fa-icon>
                About
              </a>
            </li>
            <li>
              <a 
                routerLink="/auth/login" 
                (click)="closeMobileMenu()"
                (keydown.enter)="closeMobileMenu()">
                <app-fa-icon icon="sign-in-alt"></app-fa-icon>
                Login
              </a>
            </li>
            <li>
              <a 
                routerLink="/auth/register" 
                (click)="closeMobileMenu()"
                (keydown.enter)="closeMobileMenu()">
                <app-fa-icon icon="user-plus"></app-fa-icon>
                Register
              </a>
            </li>
            
            <!-- Mobile Chatbot Toggle -->
            <li class="mobile-chatbot-control">
              <button 
                class="mobile-chatbot-btn"
                (click)="toggleChatbot(); closeMobileMenu();"
                aria-label="Open chatbot">
                <app-fa-icon icon="robot"></app-fa-icon>
                <span>Chat with Assistant</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Chatbot Component -->
    <app-chatbot></app-chatbot>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  chatbotOpen = false;

  private chatbotSubscription!: Subscription;

  constructor(
    private chatbotService: ChatbotService,
    private screenReader: ScreenReaderService
  ) {}

  ngOnInit(): void {
    // Subscribe to chatbot state changes
    this.chatbotSubscription = this.chatbotService.isOpen$.subscribe(isOpen => {
      this.chatbotOpen = isOpen;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.chatbotSubscription) {
      this.chatbotSubscription.unsubscribe();
    }
  }

  // Mobile Menu Methods
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    // Announce menu state to screen readers
    if (this.mobileMenuOpen) {
      this.screenReader.announce('Mobile menu opened', 'polite');
    } else {
      this.screenReader.announce('Mobile menu closed', 'polite');
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.screenReader.announce('Mobile menu closed', 'polite');
  }

  // Chatbot Methods
  toggleChatbot(): void {
    this.chatbotService.toggleChatbot();
    
    // Announce chatbot state to screen readers
    if (!this.chatbotOpen) {
      this.screenReader.announce('Chatbot opened. How can I help you today?', 'polite');
    } else {
      this.screenReader.announce('Chatbot closed', 'polite');
    }
  }

  // Navigation Announcement
  announceNavigation(destination: string): void {
    this.screenReader.announce(`Navigating to ${destination} page`, 'polite');
    
    // Close mobile menu if open
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Keyboard Navigation for Mobile Menu
  onMobileMenuKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.closeMobileMenu();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextMenuItem(event.target as HTMLElement);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousMenuItem(event.target as HTMLElement);
        break;
    }
  }

  private focusNextMenuItem(currentItem: HTMLElement): void {
    const menuItems = Array.from(
      document.querySelectorAll('.mobile-menu a, .mobile-menu .mobile-chatbot-btn')
    ) as HTMLElement[];
    
    const currentIndex = menuItems.indexOf(currentItem);
    const nextIndex = (currentIndex + 1) % menuItems.length;
    
    if (menuItems[nextIndex]) {
      menuItems[nextIndex].focus();
    }
  }

  private focusPreviousMenuItem(currentItem: HTMLElement): void {
    const menuItems = Array.from(
      document.querySelectorAll('.mobile-menu a, .mobile-menu .mobile-chatbot-btn')
    ) as HTMLElement[];
    
    const currentIndex = menuItems.indexOf(currentItem);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
    
    if (menuItems[previousIndex]) {
      menuItems[previousIndex].focus();
    }
  }
}