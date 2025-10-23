// src/app/core/services/accessibility.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private settings = new BehaviorSubject<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false
  });

  settings$: Observable<AccessibilitySettings> = this.settings.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.loadSettings();
    this.detectSystemPreferences();
  }

  private loadSettings(): void {
    const saved = localStorage.getItem('mindbridge-accessibility');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        this.settings.next(settings);
        this.applySettings(settings);
      } catch (e) {
        console.warn('Failed to load accessibility settings');
      }
    }
  }

  private detectSystemPreferences(): void {
    // Detect system preferences
    const highContrast = window.matchMedia('(prefers-contrast: high)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const current = this.settings.value;
    this.settings.next({
      ...current,
      highContrast: current.highContrast || highContrast,
      reducedMotion: current.reducedMotion || reducedMotion
    });

    this.applySystemPreferences(highContrast, reducedMotion);
  }

  private applySystemPreferences(highContrast: boolean, reducedMotion: boolean): void {
    if (highContrast) {
      this.document.body.classList.add('system-high-contrast');
    }
    if (reducedMotion) {
      this.document.body.classList.add('system-reduced-motion');
    }
  }

  updateSettings(updates: Partial<AccessibilitySettings>): void {
    const current = this.settings.value;
    const newSettings = { ...current, ...updates };
    
    this.settings.next(newSettings);
    this.applySettings(newSettings);
    this.saveSettings(newSettings);
  }

  private applySettings(settings: AccessibilitySettings): void {
    const body = this.document.body;

    // High contrast
    if (settings.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    // Large text
    if (settings.largeText) {
      body.classList.add('large-text');
      this.document.documentElement.style.fontSize = '125%';
    } else {
      body.classList.remove('large-text');
      this.document.documentElement.style.fontSize = '100%';
    }

    // Reduced motion
    if (settings.reducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }
  }

  private saveSettings(settings: AccessibilitySettings): void {
    localStorage.setItem('mindbridge-accessibility', JSON.stringify(settings));
  }

  toggleHighContrast(): void {
    const current = this.settings.value;
    this.updateSettings({ highContrast: !current.highContrast });
  }

  toggleLargeText(): void {
    const current = this.settings.value;
    this.updateSettings({ largeText: !current.largeText });
  }

  toggleReducedMotion(): void {
    const current = this.settings.value;
    this.updateSettings({ reducedMotion: !current.reducedMotion });
  }

  getCurrentSettings(): AccessibilitySettings {
    return this.settings.value;
  }
}