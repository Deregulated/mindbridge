/**
 * Application constants and configuration
 */

// Validation Patterns
export const ValidationPatterns = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[\d\s-()]{10,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  NAME: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
  URL: /^https?:\/\/.+\..+$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/
};

// Session Status
export const SessionStatus = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed', 
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  LIVE: 'live'
} as const;

// User Roles
export const UserRoles = {
  CLIENT: 'client',
  EXPERT: 'expert',
  ADMIN: 'admin'
} as const;

// Subscription Types
export const SubscriptionTypes = {
  BASIC: 'basic',
  PREMIUM: 'premium', 
  ENTERPRISE: 'enterprise'
} as const;

// Subscription Status
export const SubscriptionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled'
} as const;

// Application Configuration
export const AppConfig = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SESSION_DURATION: 60, // minutes
  MAX_SESSIONS_PER_DAY: 3,
  SUPPORT_EMAIL: 'support@mindbridge.com',
  SUPPORT_PHONE: '+1 (555) 123-4567',
  DEFAULT_AVATAR: 'assets/images/default-avatar.png',
  MAX_BIO_LENGTH: 500,
  MIN_PASSWORD_LENGTH: 6
};

// Local Storage Keys
export const LocalStorageKeys = {
  ACCESS_TOKEN: 'mindbridge_access_token',
  REFRESH_TOKEN: 'mindbridge_refresh_token', 
  USER_DATA: 'mindbridge_user_data',
  ACCESSIBILITY_SETTINGS: 'accessibility_settings',
  CHAT_HISTORY: 'mindbridge_chat_history',
  THEME_PREFERENCE: 'mindbridge_theme'
};

// API Endpoints
export const ApiEndpoints = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile'
  },
  SESSIONS: {
    LIST: '/api/sessions',
    CREATE: '/api/sessions',
    UPDATE: '/api/sessions/:id',
    CANCEL: '/api/sessions/:id/cancel'
  },
  EXPERTS: {
    LIST: '/api/experts',
    PROFILE: '/api/experts/:id'
  }
};

// Route Paths
export const RoutePaths = {
  HOME: '/',
  ABOUT: '/about',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password'
  },
  CLIENT: {
    DASHBOARD: '/client/dashboard',
    SESSIONS: '/client/sessions', 
    PROFILE: '/client/profile'
  },
  EXPERT: {
    DASHBOARD: '/expert/dashboard',
    SESSIONS: '/expert/sessions',
    PROFILE: '/expert/profile'
  }
};

// Error Messages
export const ErrorMessages = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'An account with this email already exists.',
  SESSION_CONFLICT: 'This time slot is already booked.'
};

// Success Messages  
export const SuccessMessages = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  PROFILE_UPDATE: 'Profile updated successfully!',
  SESSION_BOOKED: 'Session booked successfully!',
  SESSION_CANCELLED: 'Session cancelled successfully!',
  PASSWORD_RESET_SENT: 'Password reset instructions sent to your email.'
};

// Export as default for easy importing
export default {
  ValidationPatterns,
  SessionStatus,
  UserRoles, 
  SubscriptionTypes,
  SubscriptionStatus,
  AppConfig,
  LocalStorageKeys,
  ApiEndpoints,
  RoutePaths,
  ErrorMessages,
  SuccessMessages
};