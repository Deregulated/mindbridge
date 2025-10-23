import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  isOpen = false;
  messages: ChatMessage[] = [];
  newMessage = '';

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.chatbotService.isOpen$.subscribe(open => {
      this.isOpen = open;
    });

    this.chatbotService.messages$.subscribe(messages => {
      this.messages = messages;
      this.scrollToBottom();
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.chatbotService.toggleChat();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatbotService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = 
          this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  clearChat(): void {
    this.chatbotService.clearMessages();
  }
}