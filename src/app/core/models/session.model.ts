export interface Session {
  id: string;
  clientId: string;
  expertId: string;
  clientName?: string;
  expertName?: string;
  scheduledDate: Date;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  topic: string;
  notes?: string;
  rating?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}