import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  fullName: String,
  role: String,
  status: String,
});
