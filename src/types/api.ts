export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    pagination?: PaginationMeta;
    timestamp: string;
    requestId: string;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    pagination: PaginationMeta;
    timestamp: string;
    requestId: string;
  };
}

export interface ApiError {
  success: false;
  error: string;
  code: string;
  details?: any;
  timestamp: string;
  requestId: string;
}

export interface RequestQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  filter?: Record<string, any>;
}

export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  path: string;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

// API Request Types
export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserRequest {
  name?: string;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  preferences?: any;
}

export interface CreatePortfolioRequest {
  title: string;
  description: string;
  theme?: string;
  layout?: string;
  is_public?: boolean;
}

export interface UpdatePortfolioRequest {
  title?: string;
  description?: string;
  theme?: string;
  layout?: string;
  is_public?: boolean;
  custom_sections?: any[];
  seo_metadata?: any;
}

export interface CreateProjectRequest {
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

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  detailed_description?: string;
  images?: any[];
  live_url?: string;
  github_url?: string;
  demo_video_url?: string;
  technologies_used?: string[];
  start_date?: string;
  end_date?: string;
  is_featured?: boolean;
  sort_order?: number;
}

export interface AIRequest {
  type: "resume_analysis" | "project_suggestion" | "content_enhancement" | "skill_analysis";
  data: any;
  context?: string;
}

export interface AIResponse {
  success: boolean;
  data?: any;
  usage?: {
    tokens_used: number;
    cost: number;
  };
}