import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthRegisterLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  creditcard_type: string;

  @ApiProperty()
  @IsNotEmpty()
  creditcard_number: string;

  @ApiProperty()
  @IsNotEmpty()
  creditcard_name: string;

  @ApiProperty()
  @IsNotEmpty()
  creditcard_expired: string;

  @ApiProperty()
  @IsNotEmpty()
  creditcard_cvv: string;
}
