import mongoose, { Document, Schema } from 'mongoose';
import { AISuggestion as IAISuggestion, AISuggestionMetadata } from '@/types/ai';

export interface AISuggestionDocument extends IAISuggestion, Document {}

const AISuggestionMetadataSchema = new Schema<AISuggestionMetadata>(
  {
    context: { type: String },
    target_role: { type: String },
    confidence_score: { type: Number, min: 0, max: 1 },
    suggested_priority: { type: String, enum: ['low', 'medium', 'high'] },
    implementation_steps: [{ type: String }],
    estimated_effort: { type: String, enum: ['low', 'medium', 'high'] },
  },
  { _id: false }
);

const aiSuggestionSchema = new Schema<AISuggestionDocument>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['skill_gap', 'project_idea', 'resume_improvement', 'interview_prep', 'content_enhancement'],
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10000,
  },
  metadata: AISuggestionMetadataSchema,
  is_implemented: {
    type: Boolean,
    default: false,
  },
  expires_at: { type: Date, index: { expires: '1s' } }, // TTL index
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

aiSuggestionSchema.index({ user_id: 1, type: 1, created_at: -1 });

export default mongoose.models.AISuggestion || mongoose.model<AISuggestionDocument>('AISuggestion', aiSuggestionSchema);
