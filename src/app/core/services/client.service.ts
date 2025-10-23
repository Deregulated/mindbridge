import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Client, Subscription } from '../models/client.model';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<ApiResponse<Client>> {
    return of({
      success: true,
      data: {
        id: 'client1',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        avatar: '👨‍💼',
        phone: '+1 (555) 123-4567',
        role: 'client',
        isActive: true,
        emailVerified: true,
        lastLogin: new Date(),
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date(),
        company: 'Tech Solutions Inc.',
        industry: 'Technology',
        goals: ['Career Advancement', 'Skill Development'],
        preferences: {
          communicationStyle: 'video',
          sessionFrequency: 'weekly',
          expertLevel: 'senior'
        },
        subscription: {
          type: 'premium',
          startDate: new Date('2023-01-15'),
          endDate: new Date('2024-01-15'),
          active: true
        },
        bio: 'Experienced professional looking to advance career through expert guidance.'
      }
    });
  }

  updateProfile(profileData: Partial<Client>): Observable<ApiResponse<Client>> {
    return of({
      success: true,
      data: {
        ...this.getDefaultClient(),
        ...profileData
      } as Client
    });
  }

  getSessions(): Observable<ApiResponse<Session[]>> {
    return of({
      success: true,
      data: [
        {
          id: '1',
          clientId: 'client1',
          expertId: 'expert1',
          expertName: 'Dr. Sarah Smith',
          scheduledDate: new Date('2024-01-15T10:00:00'),
          duration: 60,
          status: 'confirmed',
          topic: 'Career Guidance',
          notes: 'Discussion about career transition to tech industry',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        }
      ]
    });
  }

  private getDefaultClient(): Client {
    return {
      id: 'client1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      avatar: '👨‍💼',
      role: 'client',
      isActive: true,
      emailVerified: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      bio: ''
    };
  }
}