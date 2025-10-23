import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Get the current user from the auth service
  const currentUser = authService.getCurrentUser();
  
  // If we have a user and they're authenticated, add authorization header
  if (currentUser && authService.isAuthenticated()) {
    // Since we're using mock data, we'll use a mock token
    // In a real app, you'd get this from localStorage or the auth service
    const token = 'mock-jwt-token';
    
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};