import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<ApiResponse<any>> {
    // Determine role based on email for demo purposes
    const isClient = loginData.email.includes('client');
    const isExpert = loginData.email.includes('expert');
    
    const role = isClient ? 'client' : isExpert ? 'expert' : 'client';
    
    const userData = {
      id: '1',
      email: loginData.email,
      firstName: 'John',
      lastName: 'Doe',
      role: role,
      isActive: true,
      emailVerified: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of({
      success: true,
      data: {
        user: userData,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600
      }
    });
  }

  register(registerData: any): Observable<ApiResponse<any>> {
    return of({
      success: true,
      data: {
        user: {
          id: '2',
          email: registerData.email,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          role: registerData.role,
          isActive: true,
          emailVerified: false,
          lastLogin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600
      }
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }
}