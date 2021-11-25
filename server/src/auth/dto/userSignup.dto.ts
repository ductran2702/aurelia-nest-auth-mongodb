import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSignupDto {
  @IsEmail()
  @ApiProperty({ example: 'someone@yopmail.com', description: 'User\'s Email', type: () => 'string' })
  readonly email: { type: string, lowercase: true };

  @IsString()
  @MinLength(5)
  @ApiProperty({ example: 'password', description: 'User\'s Password (only applies when using username/password)', type: () => 'string' })
  readonly password: string;

  @IsString()
  @ApiProperty({ example: 'username1', description: 'User\'s Display Name to use in the UI', type: () => 'string' })
  readonly displayName: string;

  // readonly id?: string;

  // @ApiProperty({ description: 'User Id when defined', type: () => 'string' })
  // readonly userId?: string;
}
