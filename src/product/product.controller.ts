import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDTO } from './createProduct.dto';
import { QueryProductDTO } from './queryProduct.dto';
import { UpdateProductDTO } from './updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getProduct(
    @Query(new ValidationPipe()) query: QueryProductDTO,
  ): Promise<Product[]> {
    return this.productService.getProduct(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  public async createProduct(@Body() payload: CreateProductDTO) {
    return this.productService.createProduct(payload);
  }

  @Put()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  public async updateProduct(@Body() payload: UpdateProductDTO) {
    return this.productService.updateProduct(payload);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  public async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
