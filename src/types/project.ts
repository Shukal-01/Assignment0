import { Document, Types } from "mongoose";

export interface Project extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  detailed_description: string;
  images: ProjectImage[];
  live_url?: string;
  github_url?: string;
  demo_video_url?: string;
  technologies_used: string[];
  project_metrics: ProjectMetrics;
  start_date: Date;
  end_date?: Date;
  is_featured: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
  ai_tags: AITags;
  difficulty_score: DifficultyScore;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt_text: string;
  file_size: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface ProjectMetrics {
  github_stars?: number;
  github_forks?: number;
  npm_downloads?: number;
  live_visitors?: number;
  user_rating?: number;
  total_ratings?: number;
}

export interface AITags {
  category: string[];
  skills: string[];
  complexity: "beginner" | "intermediate" | "advanced";
  estimated_time: string;
}

export interface DifficultyScore {
  technical: number; // 1-10
  creative: number; // 1-10
  business: number; // 1-10
  overall: number; // 1-10
}

export interface ProjectCreateData {
  title: string;
  description: string;
  detailed_description?: string;
  live_url?: string;
  github_url?: string;
  demo_video_url?: string;
  technologies_used: string[];
  start_date: string;
  end_date?: string;
  is_featured?: boolean;
}

export interface ProjectUpdateData {
  title?: string;
  description?: string;
  detailed_description?: string;
  images?: ProjectImage[];
  live_url?: string;
  github_url?: string;
  demo_video_url?: string;
  technologies_used?: string[];
  start_date?: string;
  end_date?: string;
  is_featured?: boolean;
  sort_order?: number;
}