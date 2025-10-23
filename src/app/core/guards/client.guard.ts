import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const clientGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = authService.getCurrentUser();
  return user?.role === 'client';
};