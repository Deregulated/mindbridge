import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFocus]',
  standalone: true
})
export class FocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}