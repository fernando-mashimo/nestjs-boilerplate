import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import UserModel from './model/user.model';
import { IException } from './exceptions/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      console.log('User successfully created');
      return createdUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findAll(): Promise<UserModel[] | IException> {
    try {
      const users = await this.userModel.find().exec();
      if (!users.length) {
        console.log('No users found');
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        console.log('User not found');
        return {};
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(unencodedEmail: string) {
    try {
      const email = decodeURIComponent(unencodedEmail);
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        console.log('User not found');
        return {};
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
