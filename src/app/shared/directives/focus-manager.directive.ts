// src/app/shared/directives/focus-manager.directive.ts
import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Directive({
  selector: '[appFocusManager]',
  standalone: true
})
export class FocusManagerDirective implements AfterViewInit, OnDestroy {
  @Input() appFocusManager: 'auto' | 'manual' | 'skip-link' = 'auto';
  @Input() focusAfterNavigation: boolean = true;
  @Input() focusDelay: number = 100;
  
  private routerSubscription?: Subscription;
  private isInitialLoad = true;

  constructor(
    private el: ElementRef<HTMLElement>,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (this.appFocusManager === 'auto' || this.appFocusManager === 'skip-link') {
      this.setupAutoFocus();
    }
  }

  private setupAutoFocus(): void {
    // Focus on initial load
    if (this.isInitialLoad) {
      setTimeout(() => this.focusElement(), this.focusDelay);
      this.isInitialLoad = false;
    }

    // Focus after navigation
    if (this.focusAfterNavigation) {
      this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          setTimeout(() => this.focusElement(), this.focusDelay);
        });
    }
  }

  @HostListener('click')
  onClick(): void {
    if (this.appFocusManager === 'skip-link') {
      this.focusTargetElement();
    }
  }

  @HostListener('keydown.enter')
  onEnter(): void {
    if (this.appFocusManager === 'skip-link') {
      this.focusTargetElement();
    }
  }

  private focusElement(): void {
    const element = this.el.nativeElement;
    
    if (this.shouldFocusElement(element)) {
      element.focus();
    }
  }

  private focusTargetElement(): void {
    if (this.appFocusManager === 'skip-link') {
      const targetId = this.el.nativeElement.getAttribute('href')?.replace('#', '');
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Make sure target is focusable
          if (!targetElement.hasAttribute('tabindex')) {
            targetElement.setAttribute('tabindex', '-1');
          }
          targetElement.focus();
          
          // Scroll to element
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  private shouldFocusElement(element: HTMLElement): boolean {
    return element && this.isFocusable(element) && document.activeElement !== element;
  }

  private isFocusable(element: HTMLElement): boolean {
    // Skip links should always be focusable
    if (this.appFocusManager === 'skip-link') return true;

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return element.matches(focusableSelectors);
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}