// Export all types from their respective modules
export * from './auth';
export * from './portfolio';
export * from './project';
export * from './user';
export * from './ai';
export * from './api';

// Common utility types
export type ObjectId = string;

export interface SearchParams {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  filter?: Record<string, any>;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  validation?: any;
}

export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type Theme = 'light' | 'dark' | 'system';

export type UserRole = 'user' | 'premium' | 'admin';

export interface NavigationItem {
  href: string;
  label: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}