export interface User {
  id: string;
  email: string;
  role: 'client' | 'expert';
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  emailVerified?: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
export interface Client extends User {
  company?: string;
  industry?: string;
  goals?: string[];
  subscription?: Subscription;
}

export interface Expert extends User {
  specialization: string[];
  yearsOfExperience: number;
  qualifications: string[];
  hourlyRate: number;
  rating: number;
  totalSessions: number;
  bio: string;
  verified: boolean;
}

export interface Subscription {
  type: 'basic' | 'premium' | 'enterprise';
  startDate: Date;
  endDate: Date;
  active: boolean;
}

