export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  role: 'client' | 'expert' | 'admin';
  active: boolean;
  emailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'expert';
  phone?: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
  refreshToken: string;
  expiresIn: number;
}