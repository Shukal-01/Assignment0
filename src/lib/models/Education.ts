import mongoose, { Document, Schema } from 'mongoose';
import { Education as IEducation } from '@/types/user';

export interface EducationDocument extends IEducation, Document {}

const educationSchema = new Schema<EducationDocument>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  institution: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  degree: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  field_of_study: {
    type: String,
    trim: true,
    maxlength: 150,
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
  gpa: { type: Number },
  achievements: [{ type: String, trim: true, maxlength: 500 }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

educationSchema.index({ user_id: 1, start_date: -1 });

export default mongoose.models.Education || mongoose.model<EducationDocument>('Education', educationSchema);
