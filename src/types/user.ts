import { Document, Types } from "mongoose";

export interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  password_hash: string;
  name: string;
  avatar_url?: string;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  is_premium: boolean;
  created_at: Date;
  updated_at: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  emailNotifications: boolean;
  publicProfile: boolean;
  showContactInfo: boolean;
  linkedinProfile?: boolean;
  githubContributions?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  is_premium: boolean;
  created_at: Date;
}

export interface Experience extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  company: string;
  position: string;
  description: string;
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
  location?: string;
  achievements: string[];
  company_info?: CompanyInfo;
}

export interface CompanyInfo {
  industry: string;
  size: string;
  website?: string;
  logo_url?: string;
}

export interface Education extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
  gpa?: number;
  achievements: string[];
}

export interface Skill {
  name: string;
  category: "technical" | "design" | "business" | "soft";
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
  years_of_experience?: number;
}