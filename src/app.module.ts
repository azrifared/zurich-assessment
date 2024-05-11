import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import * as env from 'env-var';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const DB_HOST = env.get('DB_HOST').asString();
const DB_USERNAME = env.get('DB_USERNAME').asString();
const DB_PASSWORD = env.get('DB_PASSWORD').asString();
const DB_NAME = env.get('DB_NAME').asString();
const DB_PORT = env.get('DB_PORT').asInt();
const ENABLE_DB_SSL = env.get('ENABLE_DB_SSL').asBool();

if (!DB_HOST) {
  console.error('Missing environment variable: DB_HOST');
  process.exit(1);
} else if (!DB_USERNAME) {
  console.error('Missing environment variable: DB_USERNAME');
  process.exit(1);
} else if (!DB_PASSWORD) {
  console.error('Missing environment variable: DB_PASSWORD');
  process.exit(1);
} else if (!DB_PORT) {
  console.error('Missing environment variable: DB_PORT');
  process.exit(1);
} else if (!DB_NAME) {
  console.error('Missing environment variable: DB_NAME');
  process.exit(1);
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      ssl: ENABLE_DB_SSL,
    }),
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
