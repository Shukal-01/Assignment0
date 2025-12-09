import mongoose, { Document, Schema, Types } from 'mongoose';
import { Portfolio as IPortfolio, SEOMetadata, CustomSection } from '@/types/portfolio';

export interface PortfolioDocument extends IPortfolio, Document {}

const SEOMetadataSchema = new Schema<SEOMetadata>({
  title: { type: String, maxlength: 120 },
  description: { type: String, maxlength: 300 },
  keywords: [{ type: String }],
  og_image: { type: String },
  canonical_url: { type: String },
}, { _id: false });

const CustomSectionSchema = new Schema<CustomSection>({
  id: { type: String, required: true },
  type: { type: String, enum: ['text', 'skills', 'testimonials', 'contact'], required: true },
  title: { type: String, required: true, maxlength: 100 },
  content: { type: Schema.Types.Mixed },
  order: { type: Number, required: true },
}, { _id: false });

const portfolioSchema = new Schema<PortfolioDocument>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: [true, 'Portfolio title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    // Basic slug validation, more robust generation logic should be in the service layer
    match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  theme: {
    type: String,
    default: 'default',
  },
  layout: {
    type: String,
    default: 'standard',
  },
  is_public: {
    type: Boolean,
    default: false,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  custom_sections: [CustomSectionSchema],
  seo_metadata: SEOMetadataSchema,
  view_count: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

// Indexes
portfolioSchema.index({ slug: 1, user_id: 1 }, { unique: true });
portfolioSchema.index({ is_public: 1, view_count: -1 });
portfolioSchema.index({ is_featured: 1 });

export default mongoose.models.Portfolio || mongoose.model<PortfolioDocument>('Portfolio', portfolioSchema);
