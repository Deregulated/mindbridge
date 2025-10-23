import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Expert } from '../models/expert.model';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<ApiResponse<Expert>> {
    return of({
      success: true,
      data: {
        id: 'expert1',
        email: 'sarah.smith@example.com',
        firstName: 'Sarah',
        lastName: 'Smith',
        avatar: '👩‍💼',
        phone: '+1 (555) 987-6543',
        role: 'expert',
        isActive: true, // CHANGED: active -> isActive
        emailVerified: true,
        lastLogin: new Date(),
        createdAt: new Date('2022-05-10'),
        updatedAt: new Date(),
        specialization: ['Career Counseling', 'Leadership Coaching'],
        yearsOfExperience: 8,
        qualifications: [
          {
            degree: 'PhD in Psychology',
            institution: 'Stanford University',
            year: 2015
          }
        ],
        hourlyRate: 120,
        availability: [
          {
            dayOfWeek: 'Monday',
            startTime: '09:00',
            endTime: '17:00',
            available: true
          }
        ],
        rating: 4.9,
        totalSessions: 45,
        bio: 'Experienced career counselor and leadership coach...',
        verified: true
      }
    });
  }

  updateProfile(profileData: Partial<Expert>): Observable<ApiResponse<Expert>> {
    return of({
      success: true,
      data: {
        ...this.getDefaultExpert(),
        ...profileData
      } as Expert
    });
  }

  updateAvailability(availability: any): Observable<ApiResponse<Expert>> {
    return of({
      success: true,
      data: this.getDefaultExpert()
    });
  }

  getSessions(): Observable<ApiResponse<Session[]>> {
    return of({
      success: true,
      data: [
        {
          id: '1',
          clientId: 'client1',
          clientName: 'Alice Johnson',
          expertId: 'expert1',
          scheduledDate: new Date('2024-01-15T10:00:00'),
          duration: 60,
          status: 'confirmed',
          topic: 'Career Guidance',
          notes: 'Client wants to discuss career transition to tech',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    });
  }

  private getDefaultExpert(): Expert {
    return {
      id: 'expert1',
      email: 'sarah.smith@example.com',
      firstName: 'Sarah',
      lastName: 'Smith',
      avatar: '👩‍💼',
      role: 'expert',
      isActive: true, // CHANGED: active -> isActive
      emailVerified: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      specialization: [],
      yearsOfExperience: 0,
      qualifications: [],
      hourlyRate: 0,
      availability: [],
      rating: 0,
      totalSessions: 0,
      bio: '',
      verified: false
    };
  }
}