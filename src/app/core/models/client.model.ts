import { User } from './user.model';

export interface Subscription {
  type: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export interface Client extends User {
  company?: string;
  industry?: string;
  goals?: string[];
  preferences?: {
    communicationStyle?: string;
    sessionFrequency?: string;
    expertLevel?: string;
  };
  subscription?: Subscription;
  bio?: string;
}