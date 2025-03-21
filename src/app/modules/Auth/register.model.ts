import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TRegister } from './register.interface';

const UserSchema = new Schema<TRegister>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'restaurant', 'user'],
      default: 'user',
      required: true,
    },
  },
  { timestamps: true },
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = model<TRegister>('User', UserSchema);
