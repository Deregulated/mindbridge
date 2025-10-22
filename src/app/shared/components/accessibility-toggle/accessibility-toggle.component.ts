import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityService } from '../../../core/services/accessibility.service';

@Component({
  selector: 'app-accessibility-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessibility-toggle.component.html',
  styleUrls: ['./accessibility-toggle.component.scss']
})
export class AccessibilityToggleComponent implements OnInit {
  isOpen = false;
  preferences: any;
  fontSizes: ('small' | 'medium' | 'large' | 'x-large')[] = ['small', 'medium', 'large', 'x-large'];

  constructor(public accessibilityService: AccessibilityService) {
    this.preferences = this.accessibilityService.getCurrentPreferences();
  }

  ngOnInit(): void {
    this.accessibilityService.preferences$.subscribe((prefs: any) => {
      this.preferences = prefs;
    });
  }

  toggleHighContrast(): void {
    this.accessibilityService.updatePreference('highContrast', !this.preferences.highContrast);
  }

  updateFontSize(size: 'small' | 'medium' | 'large' | 'x-large'): void {
    this.accessibilityService.updatePreference('fontSize', size);
  }

  toggleReducedMotion(): void {
    this.accessibilityService.updatePreference('reducedMotion', !this.preferences.reducedMotion);
  }
}