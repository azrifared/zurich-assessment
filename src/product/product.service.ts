import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateProductDTO } from './createProduct.dto';
import { QueryProductDTO } from './queryProduct.dto';
import { UpdateProductDTO } from './updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  public async getProduct(query: QueryProductDTO) {
    let queryBuilder = this.productRepository.createQueryBuilder();

    if (query.fields) {
      const fieldsQuery = [];
      let selectedFields;

      if (Array.isArray(query.fields)) {
        selectedFields = query.fields;
      } else {
        selectedFields = [query.fields];
      }

      selectedFields.forEach((field) => {
        fieldsQuery.push(`Product.${field}`);
      });

      queryBuilder.select(fieldsQuery);
    }
    if (query.id) {
      queryBuilder = queryBuilder.andWhere({ id: query.id });
    }
    if (query.code) {
      queryBuilder = queryBuilder.andWhere({ code: query.code });
    }
    if (query.price) {
      queryBuilder = queryBuilder.andWhere({ price: query.price });
    }
    if (query.description) {
      queryBuilder = queryBuilder.andWhere(
        'LOWER(Product.description) like LOWER(:desc)',
        {
          desc: `%${query.description}%`,
        },
      );
    }
    if (query.location) {
      queryBuilder = queryBuilder.andWhere(
        'LOWER(Product.location) like LOWER(:loc)',
        {
          loc: `%${query.location}%`,
        },
      );
    }

    return queryBuilder
      .take(query.take ?? 50)
      .skip(query.skip ?? 0)
      .getMany();
  }

  public async createProduct({
    code,
    location,
    price,
    description,
  }: CreateProductDTO) {
    const product = await this.productRepository.create({
      code,
      location,
      price,
      description,
    });

    return product.save();
  }

  public async updateProduct({
    id,
    code,
    description,
    price,
    location,
  }: UpdateProductDTO) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new BadRequestException(`Invalid product ID ${id}`);
    }

    if (code) product.code = code;
    if (description) product.description = description;
    if (price) product.price = price;
    if (location) product.location = location;

    return product.save();
  }

  public async deleteProduct(id: string) {
    return this.productRepository.delete(id);
  }
}
