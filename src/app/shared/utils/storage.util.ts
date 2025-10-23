import { AppConstants } from './constants';

export class StorageUtil {
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Auth specific helpers
  static getAuthToken(): string | null {
    return this.getItem<string>(AppConstants.STORAGE_KEYS.AUTH_TOKEN);
  }

  static setAuthToken(token: string): void {
    this.setItem(AppConstants.STORAGE_KEYS.AUTH_TOKEN, token);
  }

  static removeAuthToken(): void {
    this.removeItem(AppConstants.STORAGE_KEYS.AUTH_TOKEN);
  }
}