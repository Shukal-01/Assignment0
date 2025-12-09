import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User as IUser, UserPreferences } from '@/types/user';

export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userPreferencesSchema = new Schema<UserPreferences>({
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system',
  },
  emailNotifications: {
    type: Boolean,
    default: true,
  },
  publicProfile: {
    type: Boolean,
    default: true,
  },
  showContactInfo: {
    type: Boolean,
    default: false,
  },
  linkedinProfile: {
    type: Boolean,
    default: false,
  },
  githubContributions: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password_hash: {
    type: String,
    required: function() {
      // Password is required only for email authentication
      return !this.providers || this.providers.length === 0;
    },
    minlength: 6,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  avatar_url: {
    type: String,
    default: null,
  },
  headline: {
    type: String,
    maxlength: [200, 'Headline cannot exceed 200 characters'],
    default: null,
  },
  bio: {
    type: String,
    maxlength: [2000, 'Bio cannot exceed 2000 characters'],
    default: null,
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters'],
    default: null,
  },
  website: {
    type: String,
    validate: {
      validator: function(v: string) {
        if (!v) return true;
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Website must be a valid URL',
    },
    default: null,
  },
  github: {
    type: String,
    maxlength: [50, 'GitHub username cannot exceed 50 characters'],
    default: null,
  },
  linkedin: {
    type: String,
    maxlength: [50, 'LinkedIn username cannot exceed 50 characters'],
    default: null,
  },
  twitter: {
    type: String,
    maxlength: [50, 'Twitter username cannot exceed 50 characters'],
    default: null,
  },
  is_premium: {
    type: Boolean,
    default: false,
  },
  preferences: {
    type: userPreferencesSchema,
    default: () => ({}),
  },
  providers: [{
    type: String,
    enum: ['google', 'github', 'linkedin', 'email'],
  }],
  email_verified: {
    type: Boolean,
    default: false,
  },
  email_verification_token: String,
  password_reset_token: String,
  password_reset_expires: Date,
  last_login: Date,
  login_count: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password_hash;
      delete ret.email_verification_token;
      delete ret.password_reset_token;
      delete ret.password_reset_expires;
      return ret;
    },
  },
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ created_at: -1 });
userSchema.index({ is_premium: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password_hash') || !this.password_hash) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password_hash) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.password_hash);
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to create user with email
userSchema.statics.createWithEmail = async function(userData: {
  email: string;
  password: string;
  name: string;
}) {
  const { email, password, name } = userData;

  const user = new this({
    email: email.toLowerCase(),
    password_hash: password, // Will be hashed by pre-save hook
    name: name.trim(),
    providers: ['email'],
  });

  return user.save();
};

export default mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);