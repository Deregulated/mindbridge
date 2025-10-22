import { Injectable } from '@angular/core';

export interface ChatbotResponse {
  text: string;
  type: 'message' | 'suggestion';
  suggestions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private responses = {
    greeting: [
      "Hello! I'm your MindBridge assistant. How can I help you today?",
      "Hi there! I'm here to support you. What's on your mind?",
      "Welcome to MindBridge! How can I assist you today?"
    ],
    help: [
      "I can help you schedule sessions, connect with experts, or provide mental health resources.",
      "You can ask me about available experts, session booking, or general mental health information."
    ],
    expert: [
      "I can connect you with a mental health expert. Would you like to schedule a session?",
      "Our experts are here to help. Let me guide you through the booking process."
    ],
    default: [
      "I'm here to listen and help. Could you tell me more about what you're experiencing?",
      "I understand this might be difficult. Would you like to speak with one of our experts?",
      "I'm trained to provide support. Feel free to share what's on your mind."
    ]
  };

  constructor() { }

  async getResponse(userMessage: string): Promise<ChatbotResponse> {
    const message = userMessage.toLowerCase().trim();
    
    // Simple intent detection
    if (this.contains(message, ['hello', 'hi', 'hey'])) {
      return {
        text: this.getRandomResponse('greeting'),
        type: 'message',
        suggestions: ['Schedule a session', 'Talk to an expert', 'Learn about services']
      };
    } else if (this.contains(message, ['help', 'support', 'what can you do'])) {
      return {
        text: this.getRandomResponse('help'),
        type: 'message',
        suggestions: ['Book session', 'Find experts', 'Emergency resources']
      };
    } else if (this.contains(message, ['expert', 'therapist', 'counselor', 'doctor'])) {
      return {
        text: this.getRandomResponse('expert'),
        type: 'message',
        suggestions: ['Schedule now', 'View experts', 'Learn more']
      };
    } else {
      return {
        text: this.getRandomResponse('default'),
        type: 'message',
        suggestions: ['Contact expert', 'Self-help resources', 'Schedule appointment']
      };
    }
  }

  private contains(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }

  private getRandomResponse(type: keyof typeof this.responses): string {
    const responses = this.responses[type];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}