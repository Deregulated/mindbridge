import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  // Font Awesome icons
  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'user': 'fas fa-user',
      'users': 'fas fa-users',
      'email': 'fas fa-envelope',
      'lock': 'fas fa-lock',
      'calendar': 'fas fa-calendar',
      'clock': 'fas fa-clock',
      'chat': 'fas fa-comments',
      'check': 'fas fa-check',
      'close': 'fas fa-times',
      'warning': 'fas fa-exclamation-triangle',
      'info': 'fas fa-info-circle',
      'home': 'fas fa-home',
      'settings': 'fas fa-cog',
      'dashboard': 'fas fa-tachometer-alt',
      'session': 'fas fa-video',
      'expert': 'fas fa-graduation-cap',
      'client': 'fas fa-briefcase',
      'payment': 'fas fa-credit-card',
      'notification': 'fas fa-bell',
      'search': 'fas fa-search',
      'menu': 'fas fa-bars',
      'logout': 'fas fa-sign-out-alt'
    };

    return icons[iconName] || 'fas fa-question-circle';
  }
}