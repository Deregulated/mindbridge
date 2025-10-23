// src/app/shared/components/fa-icon/fa-icon.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fa-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<i [class]="iconClass" [ngStyle]="styles"></i>`,
  styleUrls: ['./fa-icon.component.scss']
})
export class FaIconComponent {
  @Input() icon!: string;
  @Input() stylePrefix: string = 'fas'; // 'fas', 'far', 'fab', 'fal'
  @Input() size: string = '';
  @Input() color: string = '';

  get iconClass(): string {
    const classes = [this.stylePrefix, `fa-${this.icon}`];
    if (this.size) {
      classes.push(`fa-${this.size}`);
    }
    return classes.join(' ');
  }

  get styles(): any {
    const styles: any = {};
    if (this.color) {
      styles.color = this.color;
    }
    return styles;
  }
}