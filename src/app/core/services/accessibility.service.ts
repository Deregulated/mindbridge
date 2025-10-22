import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AccessibilityPreferences {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'x-large';
  reducedMotion: boolean;
  screenReader: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private readonly STORAGE_KEY = 'mindbridge_accessibility';
  private preferencesSubject = new BehaviorSubject<AccessibilityPreferences>(this.getDefaultPreferences());
  public preferences$ = this.preferencesSubject.asObservable();

  constructor() {
    this.loadPreferences();
  }

  private getDefaultPreferences(): AccessibilityPreferences {
    return {
      highContrast: false,
      fontSize: 'medium',
      reducedMotion: false,
      screenReader: false
    };
  }

  private loadPreferences(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        this.preferencesSubject.next(JSON.parse(saved));
      } catch {
        this.setPreferences(this.getDefaultPreferences());
      }
    }
  }

  setPreferences(prefs: AccessibilityPreferences): void {
    this.preferencesSubject.next(prefs);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
    this.applyPreferences(prefs);
  }

  updatePreference<K extends keyof AccessibilityPreferences>(
    key: K, 
    value: AccessibilityPreferences[K]
  ): void {
    const current = this.preferencesSubject.value;
    this.setPreferences({ ...current, [key]: value });
  }

  private applyPreferences(prefs: AccessibilityPreferences): void {
    const root = document.documentElement;
    
    // Apply high contrast
    root.classList.toggle('high-contrast', prefs.highContrast);
    
    // Apply font size
    root.style.setProperty('--font-size-modifier', this.getFontSizeValue(prefs.fontSize));
    
    // Apply reduced motion
    root.classList.toggle('reduced-motion', prefs.reducedMotion);
  }

  private getFontSizeValue(size: string): string {
    const sizes = {
      'small': '0.875rem',
      'medium': '1rem',
      'large': '1.125rem',
      'x-large': '1.25rem'
    };
    return sizes[size as keyof typeof sizes] || '1rem';
  }

  getCurrentPreferences(): AccessibilityPreferences {
    return this.preferencesSubject.value;
  }
}