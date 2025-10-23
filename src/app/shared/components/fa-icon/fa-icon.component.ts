import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconStyle = 'fas' | 'far' | 'fab' | 'fal' | 'fad';
export type IconSize = 'xs' | 'sm' | 'lg' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';

@Component({
  selector: 'app-fa-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<i [class]="iconClass" [ngStyle]="styles" [class.spin]="spin" [class.pulse]="pulse"></i>`
})
export class FaIconComponent {
  @Input() icon!: string;
  @Input() stylePrefix: IconStyle = 'fas';
  @Input() size: IconSize | string = '';
  @Input() color: string = '';
  @Input() additionalClasses: string = '';
  @Input() spin: boolean = false;
  @Input() pulse: boolean = false;
  @Input() fixedWidth: boolean = false;
  @Input() border: boolean = false;
  @Input() pull: 'left' | 'right' | '' = '';

  get iconClass(): string {
    const classes = [
      this.stylePrefix,
      `fa-${this.icon}`,
      this.size ? `fa-${this.size}` : '',
      this.fixedWidth ? 'fa-fw' : '',
      this.border ? 'fa-border' : '',
      this.pull ? `fa-pull-${this.pull}` : '',
      this.spin ? 'fa-spin' : '',
      this.pulse ? 'fa-pulse' : '',
      this.additionalClasses
    ].filter(Boolean).join(' ').trim();
    
    return classes;
  }

  get styles(): any {
    const styles: any = {};
    if (this.color) {
      styles.color = this.color;
    }
    return styles;
  }
}