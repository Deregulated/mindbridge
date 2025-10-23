import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private messages = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messages.asObservable();
  private isOpen = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpen.asObservable();

  constructor() {
    // Add welcome message
    this.addBotMessage('Hello! I\'m your MindBridge assistant. How can I help you today?');
  }

  toggleChat(): void {
    this.isOpen.next(!this.isOpen.value);
  }

  openChat(): void {
    this.isOpen.next(true);
  }

  closeChat(): void {
    this.isOpen.next(false);
  }

  sendMessage(text: string): void {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.next([...this.messages.value, userMessage]);
    this.generateBotResponse(text.trim());
  }

  private addBotMessage(text: string): void {
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    };

    this.messages.next([...this.messages.value, botMessage]);
  }

  private generateBotResponse(userMessage: string): void {
    // Simulate typing delay
    setTimeout(() => {
      const responses = this.getResponses(userMessage.toLowerCase());
      this.addBotMessage(responses);
    }, 1000);
  }

  private getResponses(message: string): string {
    const responses: { [key: string]: string } = {
      'hello': 'Hello! How can I assist you with MindBridge today?',
      'hi': 'Hi there! What can I help you with?',
      'help': 'I can help you with:\n• Booking sessions\n• Managing your profile\n• Technical issues\n• Billing questions\n• General information',
      'session': 'To book a session:\n1. Go to your dashboard\n2. Click "Book Session"\n3. Choose an expert\n4. Select date & time\n5. Confirm booking',
      'profile': 'You can update your profile by:\n1. Going to your profile page\n2. Editing your information\n3. Saving changes',
      'payment': 'For payment issues:\n• Check your subscription status\n• Update payment method\n• Contact support for billing help',
      'technical': 'For technical support:\n• Refresh the page\n• Clear browser cache\n• Try a different browser\n• Contact our support team',
      'thank': 'You\'re welcome! Is there anything else I can help with?',
      'bye': 'Goodbye! Feel free to reach out if you need more help.'
    };

    for (const [key, response] of Object.entries(responses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    return 'I\'m here to help! You can ask me about:\n• Booking sessions\n• Profile management\n• Technical support\n• Payment questions\n• General guidance';
  }

  clearMessages(): void {
    this.messages.next([]);
    this.addBotMessage('Hello! I\'m your MindBridge assistant. How can I help you today?');
  }
}