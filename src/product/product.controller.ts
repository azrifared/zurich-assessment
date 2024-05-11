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
import { RoleGuard } from 'src/auth/role/role.guard';
import { CreateProductDTO } from './createProduct.dto';
import { QueryProductDTO } from './queryProduct.dto';
import { UpdateProductDTO } from './updateProduct.dto';
import { Roles } from '..//auth/role/role.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  public async getProduct(
    @Query(new ValidationPipe()) query: QueryProductDTO,
  ): Promise<Product[]> {
    return this.productService.getProduct(query);
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('JWT')
  public async createProduct(@Body() payload: CreateProductDTO) {
    return this.productService.createProduct(payload);
  }

  @Put()
  @Roles('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('JWT')
  public async updateProduct(@Body() payload: UpdateProductDTO) {
    return this.productService.updateProduct(payload);
  }

  @Delete('/:id')
  @Roles('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth('JWT')
  public async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
