import mongoose, { Document, Schema } from 'mongoose';
import { Experience as IExperience, CompanyInfo } from '@/types/user';

export interface ExperienceDocument extends IExperience, Document {}

const CompanyInfoSchema = new Schema<CompanyInfo>(
  {
    industry: { type: String },
    size: { type: String },
    website: { type: String },
    logo_url: { type: String },
  },
  { _id: false }
);

const experienceSchema = new Schema<ExperienceDocument>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  position: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: { type: Date },
  is_current: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  achievements: [{ type: String, trim: true, maxlength: 500 }],
  company_info: CompanyInfoSchema,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

experienceSchema.index({ user_id: 1, start_date: -1 });

export default mongoose.models.Experience || mongoose.model<ExperienceDocument>('Experience', experienceSchema);
