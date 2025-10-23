import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityService, AccessibilitySettings } from '../../../core/services/accessibility.service';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {
  isPanelOpen = false;
  settings: AccessibilitySettings = {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false
  };

  constructor(private accessibilityService: AccessibilityService) {}

  ngOnInit(): void {
    this.accessibilityService.settings$.subscribe(settings => {
      this.settings = settings;
    });
  }

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  toggleHighContrast(): void {
    this.accessibilityService.toggleHighContrast();
  }

  toggleLargeText(): void {
    this.accessibilityService.toggleLargeText();
  }

  toggleReducedMotion(): void {
    this.accessibilityService.toggleReducedMotion();
  }

  toggleScreenReader(): void {
    this.accessibilityService.toggleScreenReader();
  }
}