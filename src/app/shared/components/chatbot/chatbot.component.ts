// src/app/shared/components/chatbot/chatbot.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '../fa-icon/fa-icon.component';
import { ChatbotService, ChatMessage } from '../../../core/services/chatbot.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent],
  template: `
    <!-- Chatbot Toggle Button -->
    <button 
      *ngIf="!isOpen"
      class="chatbot-toggle-btn"
      (click)="openChatbot()"
      [attr.aria-label]="'Open chatbot'"
      [attr.aria-expanded]="isOpen"
      [class.pulsing]="hasUnreadMessages">
      <app-fa-icon 
        icon="robot" 
        [title]="'Chat with MindBridge Assistant'">
      </app-fa-icon>
      <span class="notification-dot" *ngIf="hasUnreadMessages"></span>
    </button>

    <!-- Chatbot Modal -->
    <div 
      *ngIf="isOpen"
      class="chatbot-overlay"
      (click)="closeChatbot()"
      [class.visible]="isOpen">
      
      <div 
        class="chatbot-container"
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-labelledby="chatbot-title"
        aria-modal="true"
        aria-describedby="chatbot-description">
        
        <!-- Chatbot Header -->
        <div class="chatbot-header">
          <div class="chatbot-title">
            <app-fa-icon icon="robot" class="title-icon"></app-fa-icon>
            <div>
              <h3 id="chatbot-title">MindBridge Assistant</h3>
              <p id="chatbot-description" class="status">
                <span class="status-dot" [class.online]="isOnline"></span>
                {{ isOnline ? 'Online' : 'Offline' }}
              </p>
            </div>
          </div>
          
          <div class="chatbot-actions">
            <button 
              class="action-btn"
              (click)="clearChat()"
              aria-label="Clear conversation">
              <app-fa-icon icon="trash"></app-fa-icon>
            </button>
            <button 
              class="action-btn"
              (click)="toggleMinimize()"
              aria-label="Minimize chatbot">
              <app-fa-icon [icon]="isMinimized ? 'window-maximize' : 'window-minimize'"></app-fa-icon>
            </button>
            <button 
              class="action-btn close-btn"
              (click)="closeChatbot()"
              aria-label="Close chatbot">
              <app-fa-icon icon="times"></app-fa-icon>
            </button>
          </div>
        </div>

        <!-- Chat Messages -->
        <div 
          *ngIf="!isMinimized"
          class="chatbot-messages"
          #messageContainer
          tabindex="0"
          aria-live="polite">
          
          <div 
            *ngFor="let message of messages"
            [class]="'message ' + message.sender + '-message'"
            [attr.aria-label]="message.sender === 'user' ? 'You said' : 'Assistant said'">
            
            <!-- Bot Message -->
            <div *ngIf="message.sender === 'bot'" class="message-content">
              <div class="message-avatar">
                <app-fa-icon icon="robot"></app-fa-icon>
              </div>
              <div class="message-bubble">
                <p>{{ message.text }}</p>
                <div class="message-time">
                  {{ message.timestamp | date:'shortTime' }}
                </div>
              </div>
            </div>

            <!-- User Message -->
            <div *ngIf="message.sender === 'user'" class="message-content user">
              <div class="message-bubble">
                <p>{{ message.text }}</p>
                <div class="message-time">
                  {{ message.timestamp | date:'shortTime' }}
                </div>
              </div>
              <div class="message-avatar">
                <app-fa-icon icon="user"></app-fa-icon>
              </div>
            </div>

            <!-- Quick Replies -->
            <div 
              *ngIf="message.sender === 'bot' && message.quickReplies"
              class="quick-replies">
              <button
                *ngFor="let reply of message.quickReplies"
                class="quick-reply-btn"
                (click)="sendQuickReply(reply)"
                [attr.aria-label]="'Send quick reply: ' + reply">
                {{ reply }}
              </button>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div *ngIf="isTyping" class="message bot-message">
            <div class="message-content">
              <div class="message-avatar">
                <app-fa-icon icon="robot"></app-fa-icon>
              </div>
              <div class="message-bubble typing-indicator">
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div *ngIf="!isMinimized" class="chatbot-input">
          <div class="input-container">
            <input
              type="text"
              [(ngModel)]="userInput"
              (keydown.enter)="sendMessage()"
              placeholder="Type your message here..."
              aria-label="Type your message"
              #messageInput
              [disabled]="isTyping">
            
            <button
              class="send-btn"
              (click)="sendMessage()"
              [disabled]="!userInput.trim() || isTyping"
              aria-label="Send message">
              <app-fa-icon 
                [icon]="isTyping ? 'circle-notch' : 'paper-plane'"
                [class.spin]="isTyping">
              </app-fa-icon>
            </button>
          </div>
          
          <div class="input-hints">
            <span>Press Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  isOpen = false;
  isMinimized = false;
  isTyping = false;
  isOnline = true;
  hasUnreadMessages = false;
  userInput = '';
  messages: ChatMessage[] = [];

  private messagesSubscription!: Subscription;
  private isOpenSubscription!: Subscription;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.messagesSubscription = this.chatbotService.messages$.subscribe(messages => {
      this.messages = messages;
      this.hasUnreadMessages = !this.isOpen && messages.length > 1;
      this.scrollToBottom();
    });

    this.isOpenSubscription = this.chatbotService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (isOpen) {
        this.hasUnreadMessages = false;
        setTimeout(() => this.focusInput(), 100);
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
    this.isOpenSubscription?.unsubscribe();
  }

  openChatbot(): void {
    this.chatbotService.openChatbot();
  }

  closeChatbot(): void {
    this.chatbotService.closeChatbot();
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
    if (!this.isMinimized) {
      setTimeout(() => this.focusInput(), 100);
    }
  }

  sendMessage(): void {
    if (this.userInput.trim() && !this.isTyping) {
      this.chatbotService.sendUserMessage(this.userInput);
      this.userInput = '';
      this.isTyping = true;
      
      // Simulate typing completion
      setTimeout(() => {
        this.isTyping = false;
        this.focusInput();
      }, 2000);
    }
  }

  sendQuickReply(reply: string): void {
    this.userInput = reply;
    this.sendMessage();
  }

  clearChat(): void {
    this.chatbotService.clearChat();
  }

  private focusInput(): void {
    if (this.messageInput) {
      this.messageInput.nativeElement.focus();
    }
  }

  private scrollToBottom(): void {
    if (this.messageContainer) {
      setTimeout(() => {
        const container = this.messageContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }, 100);
    }
  }
}