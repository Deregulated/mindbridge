export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderType: 'client' | 'expert';
  message: string;
  timestamp: Date;
  messageType: 'text' | 'file' | 'system';
  read: boolean;
}

export interface Conversation {
  id: string;
  sessionId: string;
  participants: string[];
  lastMessage: ChatMessage;
  unreadCount: number;
}