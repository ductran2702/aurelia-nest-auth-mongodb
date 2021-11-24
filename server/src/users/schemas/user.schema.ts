import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/auth/models';

export const ProviderSchema = new Schema({
  providerId: String,
  name: String,
});

export const UserSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  userId: { type: String, unique: true },
  password: String,
  email: { type: String, lowercase: true, unique: true },
  displayName: String,
  provider: String,
  providers: [ProviderSchema],
  roles: [String],
  picture: String,
  facebook: String,
  foursquare: String,
  google: String,
  github: String,
  linkedin: String,
  live: String,
  microsoft: String,
  twitter: String,
  windowslive: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  var user = this as User;

  // only hash the password if it has been modified (or is new)
  if (user.isModified('password')) {
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
  }
  if (user.isModified('resetPasswordToken')) {
    const resetPasswordToken = user.resetPasswordToken ? await bcrypt.hash(user.resetPasswordToken, 10) : null;
    user.resetPasswordToken = resetPasswordToken;
  }
  next();
});