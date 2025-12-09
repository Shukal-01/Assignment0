import { User } from "next-auth";

export interface AuthUser extends User {
  id: string;
  isPremium?: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  emailNotifications: boolean;
  publicProfile: boolean;
  showContactInfo: boolean;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: AuthUser;
    session: {
      expires: string;
    };
  };
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export type AuthProvider = "google" | "github" | "linkedin" | "email";