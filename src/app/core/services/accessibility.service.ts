import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  public settings$ = this.settings.asObservable();

  constructor() {
    // Load saved settings from localStorage
    this.loadSettings();
  }

  toggleHighContrast(): void {
    const current = this.settings.value;
    const newSettings = { ...current, highContrast: !current.highContrast };
    this.updateSettings(newSettings);
    this.applyHighContrast(newSettings.highContrast);
  }

  toggleLargeText(): void {
    const current = this.settings.value;
    const newSettings = { ...current, largeText: !current.largeText };
    this.updateSettings(newSettings);
    this.applyLargeText(newSettings.largeText);
  }

  toggleReducedMotion(): void {
    const current = this.settings.value;
    const newSettings = { ...current, reducedMotion: !current.reducedMotion };
    this.updateSettings(newSettings);
    this.applyReducedMotion(newSettings.reducedMotion);
  }

  toggleScreenReader(): void {
    const current = this.settings.value;
    const newSettings = { ...current, screenReader: !current.screenReader };
    this.updateSettings(newSettings);
    this.applyScreenReader(newSettings.screenReader);
  }

  private updateSettings(settings: AccessibilitySettings): void {
    this.settings.next(settings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }

  private loadSettings(): void {
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      const settings = JSON.parse(saved);
      this.settings.next(settings);
      
      // Apply saved settings
      this.applyHighContrast(settings.highContrast);
      this.applyLargeText(settings.largeText);
      this.applyReducedMotion(settings.reducedMotion);
      this.applyScreenReader(settings.screenReader);
    }
  }

  private applyHighContrast(enabled: boolean): void {
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }

  private applyLargeText(enabled: boolean): void {
    if (enabled) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }
  }

  private applyReducedMotion(enabled: boolean): void {
    if (enabled) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }

  private applyScreenReader(enabled: boolean): void {
    // This would integrate with actual screen reader APIs
    // For now, we'll just add a class for visual indication
    if (enabled) {
      document.body.classList.add('screen-reader-friendly');
    } else {
      document.body.classList.remove('screen-reader-friendly');
    }
  }

  getCurrentSettings(): AccessibilitySettings {
    return this.settings.value;
  }
}