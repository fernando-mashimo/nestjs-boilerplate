import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  userName: string;
  password: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  fullName: string;

  status: string;
}
