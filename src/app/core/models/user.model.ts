export interface User {
  id: string;
  email: string;
  role: 'client' | 'expert';
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Client extends User {
  dateOfBirth?: Date;
  emergencyContact?: string;
  medicalHistory?: string;
}

export interface Expert extends User {
  specialization: string;
  licenseNumber: string;
  yearsOfExperience: number;
  bio: string;
  hourlyRate: number;
  availability: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface AccessibilityPreferences {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'x-large';
  reducedMotion: boolean;
  screenReader: boolean;
}

export interface Session {
  id: string;
  clientId: string;
  expertId: string;
  scheduledTime: Date;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  recordingUrl?: string;
  notes?: string;
}