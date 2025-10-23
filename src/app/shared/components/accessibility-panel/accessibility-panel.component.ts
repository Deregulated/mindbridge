// src/app/shared/components/accessibility-panel/accessibility-panel.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '../fa-icon/fa-icon.component';
import { AccessibilityService } from '../../../core/services/accessibility.service';
import { ScreenReaderService } from '../../../core/services/screen-reader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessibility-panel',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  template: `
    <!-- Unified Accessibility Toggle Button -->
    <button 
      class="accessibility-toggle-btn"
      (click)="togglePanel()"
      [attr.aria-label]="isOpen ? 'Close accessibility panel' : 'Open accessibility panel'"
      [attr.aria-expanded]="isOpen"
      [class.open]="isOpen"
      [class.pulsing]="hasNewFeatures && !isOpen">
      
      <div class="toggle-content">
        <app-fa-icon 
          [icon]="isOpen ? 'times' : 'universal-access'" 
          [class.spin]="isOpen"
          [title]="isOpen ? 'Close accessibility settings' : 'Open accessibility settings'">
        </app-fa-icon>
        
        <!-- Feature Indicator -->
        <div class="feature-indicator" *ngIf="hasActiveFeatures && !isOpen">
          <span class="active-features-count">{{ activeFeaturesCount }}</span>
        </div>
        
        <!-- New Features Dot -->
        <span class="new-features-dot" *ngIf="hasNewFeatures && !isOpen"></span>
      </div>

      <!-- Tooltip -->
      <div class="tooltip" *ngIf="!isOpen">
        Accessibility Settings
      </div>
    </button>

    <!-- Accessibility Panel -->
    <div 
      *ngIf="isOpen"
      class="accessibility-overlay"
      (click)="closePanel()"
      [class.visible]="isOpen">
      
      <div 
        class="accessibility-panel"
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-labelledby="accessibility-title"
        aria-modal="true"
        aria-describedby="accessibility-description">
        
        <!-- Panel Header -->
        <div class="panel-header">
          <div class="panel-title">
            <app-fa-icon icon="universal-access" class="title-icon"></app-fa-icon>
            <div>
              <h2 id="accessibility-title">Accessibility Center</h2>
              <p id="accessibility-description" class="panel-subtitle">
                Customize your browsing experience
              </p>
            </div>
          </div>
          
          <div class="panel-actions">
            <button 
              class="action-btn"
              (click)="resetAllSettings()"
              aria-label="Reset all settings to default">
              <app-fa-icon icon="redo" title="Reset all settings"></app-fa-icon>
            </button>
          </div>
        </div>

        <!-- Quick Actions Bar -->
        <div class="quick-actions-bar">
          <div class="quick-action" *ngFor="let action of quickActions" 
               [class.active]="action.isActive()">
            <button 
              class="quick-action-btn"
              (click)="action.execute()"
              [attr.aria-pressed]="action.isActive()"
              [attr.aria-label]="action.label">
              <app-fa-icon [icon]="action.icon"></app-fa-icon>
              <span class="action-label">{{ action.name }}</span>
            </button>
          </div>
        </div>

        <!-- Main Controls -->
        <div class="panel-content">
          <!-- Vision Enhancement Section -->
          <div class="control-section">
            <h3 class="section-title">
              <app-fa-icon icon="eye"></app-fa-icon>
              Visual Preferences
            </h3>
            
            <div class="controls-grid">
              <!-- High Contrast -->
              <div class="control-card" [class.active]="settings.highContrast">
                <div class="control-header">
                  <app-fa-icon icon="circle" class="control-icon"></app-fa-icon>
                  <div class="control-info">
                    <h4 class="control-title">High Contrast</h4>
                    <p class="control-description">Enhanced color contrast for better visibility</p>
                  </div>
                </div>
                <button 
                  class="control-toggle"
                  (click)="toggleHighContrast()"
                  [attr.aria-pressed]="settings.highContrast"
                  aria-label="Toggle high contrast mode">
                  <span class="toggle-track">
                    <span class="toggle-thumb"></span>
                  </span>
                </button>
              </div>

              <!-- Large Text -->
              <div class="control-card" [class.active]="settings.largeText">
                <div class="control-header">
                  <app-fa-icon icon="text-height" class="control-icon"></app-fa-icon>
                  <div class="control-info">
                    <h4 class="control-title">Large Text</h4>
                    <p class="control-description">Increase text size for readability</p>
                  </div>
                </div>
                <button 
                  class="control-toggle"
                  (click)="toggleLargeText()"
                  [attr.aria-pressed]="settings.largeText"
                  aria-label="Toggle large text mode">
                  <span class="toggle-track">
                    <span class="toggle-thumb"></span>
                  </span>
                </button>
              </div>

              <!-- Reduced Motion -->
              <div class="control-card" [class.active]="settings.reducedMotion">
                <div class="control-header">
                  <app-fa-icon icon="running" class="control-icon"></app-fa-icon>
                  <div class="control-info">
                    <h4 class="control-title">Reduced Motion</h4>
                    <p class="control-description">Minimize animations and transitions</p>
                  </div>
                </div>
                <button 
                  class="control-toggle"
                  (click)="toggleReducedMotion()"
                  [attr.aria-pressed]="settings.reducedMotion"
                  aria-label="Toggle reduced motion">
                  <span class="toggle-track">
                    <span class="toggle-thumb"></span>
                  </span>
                </button>
              </div>

              <!-- Dark Mode -->
              <div class="control-card" [class.active]="isDarkMode">
                <div class="control-header">
                  <app-fa-icon [icon]="isDarkMode ? 'moon' : 'sun'" class="control-icon"></app-fa-icon>
                  <div class="control-info">
                    <h4 class="control-title">Dark Mode</h4>
                    <p class="control-description">Switch to dark color scheme</p>
                  </div>
                </div>
                <button 
                  class="control-toggle"
                  (click)="toggleDarkMode()"
                  [attr.aria-pressed]="isDarkMode"
                  aria-label="Toggle dark mode">
                  <span class="toggle-track">
                    <span class="toggle-thumb"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Screen Reader Section -->
          <div class="control-section">
            <h3 class="section-title">
              <app-fa-icon icon="assistive-listening-systems"></app-fa-icon>
              Screen Reader
            </h3>
            
            <div class="controls-grid">
              <div class="control-card full-width">
                <div class="control-header">
                  <app-fa-icon icon="volume-up" class="control-icon"></app-fa-icon>
                  <div class="control-info">
                    <h4 class="control-title">Test Announcements</h4>
                    <p class="control-description">Verify screen reader functionality</p>
                  </div>
                </div>
                <button 
                  class="test-btn"
                  (click)="testScreenReader()"
                  aria-label="Test screen reader announcements">
                  <app-fa-icon icon="play"></app-fa-icon>
                  Test Now
                </button>
              </div>
            </div>
          </div>

          <!-- Font Size Controls -->
          <div class="control-section">
            <h3 class="section-title">
              <app-fa-icon icon="font"></app-fa-icon>
              Text Size
            </h3>
            
            <div class="font-controls">
              <button 
                class="font-btn decrease"
                (click)="decreaseFontSize()"
                [disabled]="fontSizeLevel === 0"
                aria-label="Decrease font size">
                <app-fa-icon icon="minus"></app-fa-icon>
              </button>
              
              <div class="font-size-display">
                <span class="font-size-label">Text Size</span>
                <span class="font-size-value">{{ fontSizeLevel + 1 }}/5</span>
              </div>
              
              <button 
                class="font-btn increase"
                (click)="increaseFontSize()"
                [disabled]="fontSizeLevel === 4"
                aria-label="Increase font size">
                <app-fa-icon icon="plus"></app-fa-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Status Footer -->
        <div class="panel-footer">
          <div class="status-indicator" [class.active]="hasActiveFeatures">
            <app-fa-icon 
              [icon]="hasActiveFeatures ? 'check-circle' : 'circle'"
              class="status-icon">
            </app-fa-icon>
            <span class="status-text">
              {{ hasActiveFeatures ? activeFeaturesCount + ' features active' : 'All features at default' }}
            </span>
          </div>
          
          <button 
            class="close-panel-btn"
            (click)="closePanel()"
            aria-label="Close accessibility panel">
            <app-fa-icon icon="times"></app-fa-icon>
            Close
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./accessibility-panel.component.scss']
})
export class AccessibilityPanelComponent implements OnInit, OnDestroy {
  isOpen = false;
  hasNewFeatures = true;
  isDarkMode = false;
  fontSizeLevel = 0;
  
  settings: any = {
    highContrast: false,
    largeText: false,
    reducedMotion: false
  };

  private settingsSubscription!: Subscription;

  // Quick actions for the toolbar
  quickActions = [
    {
      name: 'High Contrast',
      icon: 'circle',
      label: 'Toggle high contrast mode',
      execute: () => this.toggleHighContrast(),
      isActive: () => this.settings.highContrast
    },
    {
      name: 'Large Text',
      icon: 'text-height',
      label: 'Toggle large text mode',
      execute: () => this.toggleLargeText(),
      isActive: () => this.settings.largeText
    },
    {
      name: 'Dark Mode',
      icon: 'moon',
      label: 'Toggle dark mode',
      execute: () => this.toggleDarkMode(),
      isActive: () => this.isDarkMode
    },
    {
      name: 'Reduce Motion',
      icon: 'running',
      label: 'Toggle reduced motion',
      execute: () => this.toggleReducedMotion(),
      isActive: () => this.settings.reducedMotion
    }
  ];

  constructor(
    private accessibilityService: AccessibilityService,
    private screenReader: ScreenReaderService
  ) {}

  ngOnInit(): void {
    this.settingsSubscription = this.accessibilityService.settings$.subscribe(settings => {
      this.settings = { ...this.settings, ...settings };
    });

    this.checkDarkModePreference();
    this.checkFontSizePreference();
  }

  ngOnDestroy(): void {
    this.settingsSubscription?.unsubscribe();
  }

  // Panel Methods
  togglePanel(): void {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.screenReader.announce('Accessibility panel opened. Customize your browsing experience.', 'polite');
      this.hasNewFeatures = false;
    } else {
      this.screenReader.announce('Accessibility panel closed', 'polite');
    }
  }

  closePanel(): void {
    this.isOpen = false;
    this.screenReader.announce('Accessibility panel closed', 'polite');
  }

  // Accessibility Control Methods
  toggleHighContrast(): void {
    this.accessibilityService.toggleHighContrast();
    const message = this.settings.highContrast ? 'High contrast enabled' : 'High contrast disabled';
    this.screenReader.announce(message, 'polite');
  }

  toggleLargeText(): void {
    this.accessibilityService.toggleLargeText();
    const message = this.settings.largeText ? 'Large text enabled' : 'Large text disabled';
    this.screenReader.announce(message, 'polite');
  }

  toggleReducedMotion(): void {
    this.accessibilityService.toggleReducedMotion();
    const message = this.settings.reducedMotion ? 'Reduced motion enabled' : 'Animations enabled';
    this.screenReader.announce(message, 'polite');
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('mindbridge-dark-mode', this.isDarkMode.toString());
    
    const message = this.isDarkMode ? 'Dark mode enabled' : 'Dark mode disabled';
    this.screenReader.announce(message, 'polite');
  }

  // Font Size Controls
  increaseFontSize(): void {
    if (this.fontSizeLevel < 4) {
      this.fontSizeLevel++;
      this.applyFontSize();
      this.screenReader.announce(`Font size level ${this.fontSizeLevel + 1} of 5`, 'polite');
    }
  }

  decreaseFontSize(): void {
    if (this.fontSizeLevel > 0) {
      this.fontSizeLevel--;
      this.applyFontSize();
      this.screenReader.announce(`Font size level ${this.fontSizeLevel + 1} of 5`, 'polite');
    }
  }

  private applyFontSize(): void {
    const sizes = ['100%', '115%', '130%', '145%', '160%'];
    document.documentElement.style.fontSize = sizes[this.fontSizeLevel];
    localStorage.setItem('mindbridge-font-size', this.fontSizeLevel.toString());
  }

  private checkFontSizePreference(): void {
    const savedSize = localStorage.getItem('mindbridge-font-size');
    if (savedSize !== null) {
      this.fontSizeLevel = parseInt(savedSize, 10);
      this.applyFontSize();
    }
  }

  // Screen Reader Test
  testScreenReader(): void {
    this.screenReader.announce(
      'This is a test announcement from the MindBridge Accessibility Center. All accessibility features are working correctly.',
      'polite'
    );
  }

  // Reset Functionality
  resetAllSettings(): void {
    this.accessibilityService.updateSettings({
      highContrast: false,
      largeText: false,
      reducedMotion: false
    });
    
    this.isDarkMode = false;
    document.body.classList.remove('dark-mode');
    localStorage.removeItem('mindbridge-dark-mode');
    
    this.fontSizeLevel = 0;
    this.applyFontSize();
    localStorage.removeItem('mindbridge-font-size');
    
    this.screenReader.announce('All accessibility settings have been reset to default', 'polite');
  }

  // Helper Methods
  private checkDarkModePreference(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('mindbridge-dark-mode');
    
    if (savedMode !== null) {
      this.isDarkMode = savedMode === 'true';
    } else {
      this.isDarkMode = prefersDark;
    }
    
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  get hasActiveFeatures(): boolean {
    return this.settings.highContrast || 
           this.settings.largeText || 
           this.settings.reducedMotion || 
           this.isDarkMode ||
           this.fontSizeLevel > 0;
  }

  get activeFeaturesCount(): number {
    let count = 0;
    if (this.settings.highContrast) count++;
    if (this.settings.largeText) count++;
    if (this.settings.reducedMotion) count++;
    if (this.isDarkMode) count++;
    if (this.fontSizeLevel > 0) count++;
    return count;
  }

  // Close panel on Escape key
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.closePanel();
      event.preventDefault();
    }
  }
}