import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  userName: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
  status: string;
}
