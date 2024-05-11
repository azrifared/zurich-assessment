import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  location: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  price: number;
}
