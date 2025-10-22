import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Services
import { AuthService } from '../../../core/services/auth.service';
import { AccessibilityService } from '../../../core/services/accessibility.service';
import { AccessibilityToggleComponent } from '../accessibility-toggle/accessibility-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    AccessibilityToggleComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any = null;
  isMenuOpen = false;

  constructor(
    public authService: AuthService,
    public accessibilityService: AccessibilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToDashboard(): void {
    if (this.currentUser?.role === 'client') {
      this.router.navigate(['/client/dashboard']);
    } else if (this.currentUser?.role === 'expert') {
      this.router.navigate(['/expert/dashboard']);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}