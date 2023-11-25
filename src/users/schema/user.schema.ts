import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userName: String,
  email: { type: String, unique: true },
  password: String,
  fullName: String,
  status: String,
});
