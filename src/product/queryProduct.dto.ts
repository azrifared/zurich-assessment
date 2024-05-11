import { IsOptional, IsString, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class QueryProductDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  code?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  location?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  price?: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  @ApiProperty({ required: false, isArray: true, type: 'string', minLength: 1 })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  fields?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  skip?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  take?: number;
}
