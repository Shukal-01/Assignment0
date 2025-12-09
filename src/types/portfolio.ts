import { Document, Types } from "mongoose";

export interface Portfolio extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  theme: string;
  layout: string;
  is_public: boolean;
  is_featured: boolean;
  custom_sections: CustomSection[];
  seo_metadata: SEOMetadata;
  created_at: Date;
  updated_at: Date;
  view_count: number;
}

export interface CustomSection {
  id: string;
  type: "text" | "skills" | "testimonials" | "contact";
  title: string;
  content: any;
  order: number;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  og_image?: string;
  canonical_url?: string;
}

export interface PortfolioCreateData {
  title: string;
  description: string;
  theme?: string;
  layout?: string;
  is_public?: boolean;
}

export interface PortfolioUpdateData {
  title?: string;
  description?: string;
  theme?: string;
  layout?: string;
  is_public?: boolean;
  custom_sections?: CustomSection[];
  seo_metadata?: SEOMetadata;
}

export interface PortfolioView {
  portfolio: Portfolio;
  projects: Project[];
  experiences: Experience[];
  user: User;
}

export interface PortfolioAnalytics {
  views: number;
  unique_visitors: number;
  avg_session_duration: number;
  bounce_rate: number;
  referrers: string[];
  popular_projects: string[];
}