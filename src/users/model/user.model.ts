import { Document } from 'mongoose';

export default class UserModel extends Document {
  userName: string;
  email: string;
  password: string;
  fullName: string;
  status: string;
}
