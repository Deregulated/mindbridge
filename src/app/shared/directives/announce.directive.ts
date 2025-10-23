// src/app/shared/directives/announce.directive.ts
import { Directive, Input, OnDestroy } from '@angular/core';
import { ScreenReaderService } from '../../core/services/screen-reader.service';

@Directive({
  selector: '[appAnnounce]',
  standalone: true
})
export class AnnounceDirective implements OnDestroy {
  @Input() appAnnounce: string = '';
  @Input() announcePriority: 'polite' | 'assertive' = 'polite';
  @Input() announceOn: 'load' | 'click' | 'hover' = 'load';

  constructor(private screenReader: ScreenReaderService) {}

  ngOnInit(): void {
    if (this.appAnnounce && this.announceOn === 'load') {
      this.screenReader.announce(this.appAnnounce, this.announcePriority);
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }
}