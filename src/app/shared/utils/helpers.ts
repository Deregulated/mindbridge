/**
 * Utility functions for the MindBridge application
 */

// Date and Time Utilities
export class DateHelpers {
  /**
   * Format date to readable string
   */
  static formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: format === 'short' ? 'short' : 'long',
      day: 'numeric'
    };

    if (format === 'time') {
      return dateObj.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    }

    return dateObj.toLocaleDateString('en-US', options);
  }

  /**
   * Format date and time together
   */
  static formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    return dateObj.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  /**
   * Calculate time difference in human readable format
   */
  static timeAgo(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return this.formatDate(dateObj);
  }

  /**
   * Check if date is today
   */
  static isToday(date: Date | string): boolean {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    
    return dateObj.toDateString() === today.toDateString();
  }

  /**
   * Add days to a date
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

// String Utilities
export class StringHelpers {
  /**
   * Capitalize first letter of each word
   */
  static capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  /**
   * Truncate text with ellipsis
   */
  static truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  /**
   * Generate random string ID
   */
  static generateId(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Convert camelCase to Title Case
   */
  static camelToTitleCase(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, char => char.toUpperCase())
      .trim();
  }

  /**
   * Format phone number
   */
  static formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  }
}

// Number Utilities
export class NumberHelpers {
  /**
   * Format currency
   */
  static formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  /**
   * Format number with commas
   */
  static formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
  }

  /**
   * Calculate percentage
   */
  static calculatePercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }

  /**
   * Generate random number in range
   */
  static randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Round to specified decimal places
   */
  static roundTo(value: number, decimals: number = 2): number {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
  }
}

// Array Utilities
export class ArrayHelpers {
  /**
   * Remove duplicates from array
   */
  static removeDuplicates<T>(array: T[], key?: keyof T): T[] {
    if (key) {
      const seen = new Set();
      return array.filter(item => {
        const value = item[key];
        return seen.has(value) ? false : seen.add(value);
      });
    }
    return [...new Set(array)];
  }

  /**
   * Sort array by property
   */
  static sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Group array by property
   */
  static groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
    return array.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as { [key: string]: T[] });
  }

  /**
   * Shuffle array (Fisher-Yates algorithm)
   */
  static shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Chunk array into smaller arrays
   */
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

// Object Utilities
export class ObjectHelpers {
  /**
   * Deep clone object
   */
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
    if (obj instanceof Array) return obj.map(item => this.deepClone(item)) as unknown as T;
    
    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }
    return cloned;
  }

  /**
   * Remove null/undefined properties
   */
  static removeEmptyProperties<T>(obj: T): Partial<T> {
    const cleaned: Partial<T> = {};
    for (const key in obj) {
      if (obj[key] != null) {
        cleaned[key] = obj[key];
      }
    }
    return cleaned;
  }

  /**
   * Check if object is empty
   */
  static isEmpty(obj: any): boolean {
    if (obj == null) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    return Object.keys(obj).length === 0;
  }

  /**
   * Merge multiple objects
   */
  static merge<T>(...objects: Partial<T>[]): T {
    return objects.reduce((result, current) => ({
      ...result,
      ...current
    }), {} as T);
  }
}

// Validation Utilities
export class ValidationHelpers {
  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number
   */
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Validate URL
   */
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if value is empty
   */
  static isEmpty(value: any): boolean {
    if (value == null) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }
}

// Session and Storage Utilities
export class StorageHelpers {
  /**
   * Safe localStorage getter
   */
  static getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  /**
   * Safe localStorage setter
   */
  static setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Safe localStorage remover
   */
  static removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get JSON from localStorage
   */
  static getJson<T>(key: string): T | null {
    try {
      const item = this.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  /**
   * Set JSON to localStorage
   */
  static setJson(key: string, value: any): boolean {
    try {
      return this.setItem(key, JSON.stringify(value));
    } catch {
      return false;
    }
  }

  /**
   * Clear all app-related storage
   */
  static clearAppStorage(): void {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith('mindbridge_') || 
      key.startsWith('accessibility') ||
      key.startsWith('auth_')
    );
    
    keys.forEach(key => this.removeItem(key));
  }
}

// Export all helpers as a single object for easy importing
export const Helpers = {
  date: DateHelpers,
  string: StringHelpers,
  number: NumberHelpers,
  array: ArrayHelpers,
  object: ObjectHelpers,
  validation: ValidationHelpers,
  storage: StorageHelpers
};

// Default export for convenience
export default Helpers;