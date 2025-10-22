import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private http = inject(HttpClient);

  constructor() {
    this.loadUserFromStorage();
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = this.decodeToken(token);
        this.currentUserSubject.next(decoded.user);
      } catch (error) {
        this.logout();
      }
    }
  }

  clientLogin(credentials: { email: string; password: string }): Observable<AuthResponse> {
    // For demo purposes - replace with actual API call
    return new Observable(observer => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: 'demo_token',
          user: {
            id: '1',
            email: credentials.email,
            role: 'client',
            firstName: 'Demo',
            lastName: 'User'
          }
        };
        this.setSession(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });
  }

  expertLogin(credentials: { email: string; password: string }): Observable<AuthResponse> {
    // For demo purposes - replace with actual API call
    return new Observable(observer => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: 'demo_token',
          user: {
            id: '2',
            email: credentials.email,
            role: 'expert',
            firstName: 'Dr. Demo',
            lastName: 'Expert'
          }
        };
        this.setSession(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });
  }

  clientRegister(userData: any): Observable<AuthResponse> {
    // For demo purposes - replace with actual API call
    return new Observable(observer => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: 'demo_token',
          user: {
            ...userData,
            id: '1',
            role: 'client'
          }
        };
        this.setSession(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });
  }

  expertRegister(userData: any): Observable<AuthResponse> {
    // For demo purposes - replace with actual API call
    return new Observable(observer => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: 'demo_token',
          user: {
            ...userData,
            id: '2',
            role: 'expert'
          }
        };
        this.setSession(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('token', authResult.token);
    this.currentUserSubject.next(authResult.user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
  }
}