import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) {}

  getSessions(): Observable<ApiResponse<Session[]>> {
    // Simulate API response
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
          status: 'confirmed', // fixed to a valid SessionStatus
          topic: 'Career Guidance',
          notes: 'Discussion about career transition to tech industry',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        }
      ]
    });
  }
}