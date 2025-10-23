import { User } from './user.model';

export interface Qualification {
  degree: string;
  institution: string;
  year: number;
}

export interface Availability {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Expert extends User {
  specialization: string[];
  yearsOfExperience: number;
  qualifications: Qualification[];
  hourlyRate: number;
  availability: Availability[];
  rating: number;
  totalSessions: number;
  bio: string;
  verified: boolean;
}