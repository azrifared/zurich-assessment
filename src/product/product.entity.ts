import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  location: string;

  @Column({ nullable: false })
  price: number;
}
