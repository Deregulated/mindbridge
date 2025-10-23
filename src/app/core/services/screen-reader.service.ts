// src/app/core/services/screen-reader.service.ts
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScreenReaderService implements OnDestroy {
  private liveRegion!: HTMLElement; // Definite assignment assertion
  private alertRegion!: HTMLElement; // Definite assignment assertion

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.createLiveRegions();
  }

  private createLiveRegions(): void {
    // Polite announcements (for non-urgent updates)
    this.liveRegion = this.document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.classList.add('sr-only');
    this.document.body.appendChild(this.liveRegion);

    // Assertive announcements (for urgent updates)
    this.alertRegion = this.document.createElement('div');
    this.alertRegion.setAttribute('aria-live', 'assertive');
    this.alertRegion.setAttribute('aria-atomic', 'true');
    this.alertRegion.classList.add('sr-only');
    this.document.body.appendChild(this.alertRegion);
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const region = priority === 'assertive' ? this.alertRegion : this.liveRegion;
    
    // Clear previous message
    region.textContent = '';
    
    // Allow DOM update
    setTimeout(() => {
      region.textContent = message;
      
      // Clear after announcement (for polite messages)
      if (priority === 'polite') {
        setTimeout(() => {
          region.textContent = '';
        }, 1000);
      }
    }, 100);
  }

  // Common announcement patterns
  announcePageTitle(title: string): void {
    this.announce(`Page loaded: ${title}`, 'polite');
  }

  announceFormError(field: string, message: string): void {
    this.announce(`Error in ${field}: ${message}`, 'assertive');
  }

  announceSuccess(message: string): void {
    this.announce(`Success: ${message}`, 'polite');
  }

  announceNavigation(route: string): void {
    this.announce(`Navigating to ${route}`, 'polite');
  }

  ngOnDestroy(): void {
    if (this.liveRegion?.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
    }
    if (this.alertRegion?.parentNode) {
      this.alertRegion.parentNode.removeChild(this.alertRegion);
    }
  }
}