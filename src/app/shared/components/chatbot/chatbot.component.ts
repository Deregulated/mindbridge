import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatbotService } from '../../../core/services/chatbot.service';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'message' | 'suggestion';
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  messages: ChatMessage[] = [];
  chatForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private chatbotService: ChatbotService
  ) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addWelcomeMessage();
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 1) {
      this.addWelcomeMessage();
    }
  }

  private addWelcomeMessage(): void {
    this.messages.push({
      text: 'Hello! I\'m your MindBridge assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'message'
    });
  }

  async sendMessage(): Promise<void> {
    if (this.chatForm.valid && !this.isLoading) {
      const userMessage = this.chatForm.get('message')?.value;
      
      // Add user message
      this.messages.push({
        text: userMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'message'
      });

      this.chatForm.reset();
      this.isLoading = true;

      try {
        // Get bot response
        const response = await this.chatbotService.getResponse(userMessage);
        
        // Add bot response
        this.messages.push({
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
          type: response.type
        });

        // Add suggestions if any
        if (response.suggestions) {
          response.suggestions.forEach((suggestion: string) => {
            this.messages.push({
              text: suggestion,
              sender: 'bot',
              timestamp: new Date(),
              type: 'suggestion'
            });
          });
        }

      } catch (error) {
        this.messages.push({
          text: 'I apologize, but I\'m having trouble responding right now. Please try again later or contact support.',
          sender: 'bot',
          timestamp: new Date(),
          type: 'message'
        });
      } finally {
        this.isLoading = false;
      }
    }
  }

  onSuggestionClick(suggestion: string): void {
    this.chatForm.patchValue({ message: suggestion });
    this.sendMessage();
  }
}