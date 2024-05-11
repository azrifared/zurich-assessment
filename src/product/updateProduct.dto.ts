import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  location: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  price: number;
}
