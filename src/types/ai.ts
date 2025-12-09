import { Document, Types } from "mongoose";

export interface AISuggestion extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  type: "skill_gap" | "project_idea" | "resume_improvement" | "interview_prep" | "content_enhancement";
  title: string;
  content: string;
  metadata: AISuggestionMetadata;
  is_implemented: boolean;
  created_at: Date;
  expires_at: Date;
}

export interface AISuggestionMetadata {
  context?: string;
  target_role?: string;
  confidence_score: number; // 0-1
  suggested_priority: "low" | "medium" | "high";
  implementation_steps?: string[];
  estimated_effort?: "low" | "medium" | "high";
}

export interface ResumeAnalysis {
  overall_score: number; // 0-100
  sections: ResumeSection[];
  improvements: ResumeImprovement[];
  skill_gaps: SkillGap[];
  ats_optimization: ATSOptimization;
  keyword_analysis: KeywordAnalysis;
}

export interface ResumeSection {
  name: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface ResumeImprovement {
  category: "structure" | "content" | "formatting" | "language";
  priority: "low" | "medium" | "high";
  description: string;
  example: string;
}

export interface SkillGap {
  skill: string;
  importance: number; // 1-10
  current_level: "none" | "beginner" | "intermediate" | "advanced";
  recommended_level: "intermediate" | "advanced";
  learning_resources: LearningResource[];
}

export interface LearningResource {
  title: string;
  type: "course" | "book" | "tutorial" | "project";
  url?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_time: string;
}

export interface ATSOptimization {
  score: number;
  issues: string[];
  recommendations: string[];
  missing_keywords: string[];
}

export interface KeywordAnalysis {
  relevant_keywords: KeywordMatch[];
  irrelevant_keywords: string[];
  suggested_additions: string[];
}

export interface KeywordMatch {
  keyword: string;
  frequency: number;
  relevance: number; // 0-1
}

export interface ProjectIdea {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_time: string;
  technologies: string[];
  skills_practiced: string[];
  category: string;
  portfolio_value: number; // 1-10
  learning_objectives: string[];
  similar_projects: string[];
}

export interface ContentEnhancement {
  original_text: string;
  enhanced_text: string;
  improvements: ContentImprovement[];
  tone: string;
  readability_score: number;
  seo_score: number;
}

export interface ContentImprovement {
  type: "clarity" | "impact" | "technical_detail" | "action_verbs" | "metrics";
  original: string;
  suggestion: string;
  reason: string;
}