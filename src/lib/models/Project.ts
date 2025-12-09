import mongoose, { Document, Schema } from 'mongoose';
import { Project as IProject, ProjectImage, ProjectMetrics, AITags, DifficultyScore } from '@/types/project';

export interface ProjectDocument extends IProject, Document {}

const ProjectImageSchema = new Schema<ProjectImage>(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    alt_text: { type: String, maxlength: 200 },
    file_size: { type: Number },
    dimensions: {
      width: { type: Number },
      height: { type: Number }
    },
  },
  { _id: false }
);

const ProjectMetricsSchema = new Schema<ProjectMetrics>(
  {
    github_stars: { type: Number },
    github_forks: { type: Number },
    npm_downloads: { type: Number },
    live_visitors: { type: Number },
    user_rating: { type: Number },
    total_ratings: { type: Number },
  },
  { _id: false }
);

const AITagsSchema = new Schema<AITags>(
  {
    category: [{ type: String }],
    skills: [{ type: String }],
    complexity: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    estimated_time: { type: String },
  },
  { _id: false }
);

const DifficultyScoreSchema = new Schema<DifficultyScore>(
  {
    technical: { type: Number, min: 1, max: 10 },
    creative: { type: Number, min: 1, max: 10 },
    business: { type: Number, min: 1, max: 10 },
    overall: { type: Number, min: 1, max: 10 },
  },
  { _id: false }
);

const projectSchema = new Schema<ProjectDocument>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
  },
  description: {
    type: String,
    trim: true,
    required: true,
    maxlength: [1000, 'Short description cannot exceed 1000 characters'],
  },
  detailed_description: {
    type: String,
    trim: true,
    maxlength: [15000, 'Detailed description cannot exceed 15000 characters'],
  },
  images: [ProjectImageSchema],
  live_url: { type: String },
  github_url: { type: String },
  demo_video_url: { type: String },
  technologies_used: [{ type: String, index: true }],
  project_metrics: ProjectMetricsSchema,
  start_date: {
    type: Date,
    required: true,
  },
  end_date: { type: Date },
  is_featured: {
    type: Boolean,
    default: false,
  },
  sort_order: {
    type: Number,
    default: 0,
  },
  ai_tags: AITagsSchema,
  difficulty_score: DifficultyScoreSchema,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

// Indexes
projectSchema.index({ user_id: 1, sort_order: 1 });
projectSchema.index({ slug: 1, user_id: 1 }, { unique: true });
projectSchema.index({ is_featured: 1 });

export default mongoose.models.Project || mongoose.model<ProjectDocument>('Project', projectSchema);
