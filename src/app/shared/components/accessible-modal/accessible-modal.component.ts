// src/app/shared/components/accessible-modal/accessible-modal.component.ts
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '../fa-icon/fa-icon.component';

@Component({
  selector: 'app-accessible-modal',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  template: `
    <div 
      class="modal-overlay" 
      role="dialog"
      [attr.aria-labelledby]="modalTitleId"
      [attr.aria-describedby]="modalDescriptionId"
      aria-modal="true"
      (keydown.escape)="close()">
      
      <div 
        #modalContent
        class="modal-content" 
        role="document"
        tabindex="0"
        (keydown.tab)="handleTab($event)"
        (keydown.shift.tab)="handleShiftTab($event)">
        
        <div class="modal-header">
          <h2 [id]="modalTitleId">{{ title }}</h2>
          <button 
            type="button" 
            class="close-button"
            (click)="close()"
            aria-label="Close modal">
            <app-fa-icon icon="times" aria-hidden="true"></app-fa-icon>
          </button>
        </div>
        
        <div [id]="modalDescriptionId" class="modal-body">
          <ng-content></ng-content>
        </div>
        
        <div class="modal-footer" *ngIf="showActions">
          <button 
            type="button" 
            class="btn btn-secondary"
            (click)="close()">
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-primary"
            (click)="confirm()">
            Confirm
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./accessible-modal.component.scss']
})
export class AccessibleModalComponent implements AfterViewInit, OnDestroy {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() showActions: boolean = true;
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  
  @ViewChild('modalContent') modalContent!: ElementRef<HTMLElement>;

  modalTitleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
  modalDescriptionId = `modal-desc-${Math.random().toString(36).substr(2, 9)}`;
  
  private focusableElements: HTMLElement[] = [];

  ngAfterViewInit(): void {
    this.trapFocus();
    this.modalContent.nativeElement.focus();
  }

  ngOnDestroy(): void {
    // Restore focus to previously focused element
    const previousActiveElement = document.activeElement as HTMLElement;
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  }

  private trapFocus(): void {
    const modal = this.modalContent.nativeElement;
    this.focusableElements = Array.from(modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[];

    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
  }

  handleTab(event: KeyboardEvent): void {
    if (this.focusableElements.length === 0) return;

    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    if (document.activeElement === lastElement) {
      event.preventDefault();
      this.focusableElements[0].focus();
    }
  }

  handleShiftTab(event: KeyboardEvent): void {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    if (document.activeElement === firstElement) {
      event.preventDefault();
      this.focusableElements[this.focusableElements.length - 1].focus();
    }
  }

  close(): void {
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
  }
}