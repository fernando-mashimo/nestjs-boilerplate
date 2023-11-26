import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import UserModel from './model/user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: 'User has been successfully created.',
    type: UserModel,
  })
  @ApiConflictResponse({
    description: 'User already exists.',
    type: ConflictException,
  })
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserModel | ConflictException> {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({
    description: 'Users have been successfully retrieved.',
    type: [UserModel],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    description: 'User have been successfully retrieved.',
    type: UserModel,
  })
  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({
    description: 'User have been successfully retrieved by email.',
    type: UserModel,
  })
  @Get('/email/:email')
  findbyEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @ApiOkResponse({
    description: 'User have been successfully updated.',
    type: UserModel,
  })
  @Patch('/id/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse({
    description: 'User have been successfully deleted.',
  })
  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
