export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'client' | 'expert';
  phone?: string;
}

export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
    emailVerified: boolean;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
  refreshToken: string;
  expiresIn: number;
}