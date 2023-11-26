import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import UserModel from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserModel | ConflictException> {
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

  async findAll(): Promise<UserModel[] | ExceptionsHandler> {
    try {
      const users = await this.userModel.find().exec();
      if (!users.length) {
        console.log('No users found');
        return [];
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<UserModel | ExceptionsHandler> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      if (error.status === 404) {
        console.log('User not found');
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(
    unencodedEmail: string,
  ): Promise<UserModel | ExceptionsHandler> {
    try {
      const email = decodeURIComponent(unencodedEmail);
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      if (error.status === 404) {
        console.log('User not found');
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel | ExceptionsHandler> {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      if (error.status === 404) {
        console.log('User not found');
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(unformattedId: string): Promise<string | ExceptionsHandler> {
    try {
      const id = new Types.ObjectId(unformattedId);
      const userToBeDeleted = await this.userModel.findByIdAndDelete(id).exec();
      if (!userToBeDeleted) {
        throw new NotFoundException();
      }
      return 'User successfully deleted';
    } catch (error) {
      if (error.status === 404) {
        console.log('User not found');
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
