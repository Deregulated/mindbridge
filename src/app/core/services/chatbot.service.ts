// src/app/core/services/chatbot.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'quick_reply';
  quickReplies?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private messages = new BehaviorSubject<ChatMessage[]>([]);
  private isOpen = new BehaviorSubject<boolean>(false);

  messages$: Observable<ChatMessage[]> = this.messages.asObservable();
  isOpen$: Observable<boolean> = this.isOpen.asObservable();

  private quickReplies = [
    'How do I book a session?',
    'What features are available?',
    'I need help with my account',
    'Pricing information',
    'Contact support'
  ];

  constructor() {
    // Add welcome message when service initializes
    this.addBotMessage('Hello! I\'m your MindBridge assistant. How can I help you today?', true);
  }

  toggleChatbot(): void {
    this.isOpen.next(!this.isOpen.value);
  }

  openChatbot(): void {
    this.isOpen.next(true);
  }

  closeChatbot(): void {
    this.isOpen.next(false);
  }

  sendUserMessage(text: string): void {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: this.generateId(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    this.addMessage(userMessage);
    this.simulateBotResponse(text.trim());
  }

  private addBotMessage(text: string, withQuickReplies = false): void {
    const botMessage: ChatMessage = {
      id: this.generateId(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      type: withQuickReplies ? 'quick_reply' : 'text',
      quickReplies: withQuickReplies ? this.quickReplies : undefined
    };

    this.addMessage(botMessage);
  }

  private addMessage(message: ChatMessage): void {
    const currentMessages = this.messages.value;
    this.messages.next([...currentMessages, message]);
  }

  private simulateBotResponse(userMessage: string): void {
    // Simulate typing delay
    const responses: { [key: string]: string } = {
      'hello': 'Hi there! How can I assist you with MindBridge today?',
      'hi': 'Hello! Welcome to MindBridge. What would you like to know?',
      'help': 'I can help you with booking sessions, account issues, pricing, and general information about MindBridge.',
      'session': 'To book a session: 1) Go to the Sessions page 2) Find an expert 3) Select a time slot 4) Confirm your booking',
      'book': 'You can book sessions through our platform. Would you like me to guide you through the process?',
      'pricing': 'We offer flexible pricing plans. Basic: $29/month, Pro: $79/month, Enterprise: Custom pricing. Which one interests you?',
      'account': 'For account issues, you can reset your password or contact our support team at support@mindbridge.com',
      'support': 'Our support team is available 24/7. Email: support@mindbridge.com, Phone: +1 (555) 123-4567',
      'feature': 'MindBridge features: Expert sessions, goal tracking, progress analytics, secure messaging, and flexible scheduling.',
      'thank': 'You\'re welcome! Is there anything else I can help you with?'
    };

    const lowerMessage = userMessage.toLowerCase();
    let response = 'I understand you\'re asking about: ' + userMessage + '. Our team can provide more detailed assistance.';

    // Find matching response
    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    // Simulate typing delay
    setTimeout(() => {
      this.addBotMessage(response, true);
    }, 1000 + Math.random() * 1000);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  clearChat(): void {
    this.messages.next([]);
    // Add new welcome message after clearing
    setTimeout(() => {
      this.addBotMessage('Hello! How can I help you today?', true);
    }, 500);
  }
}