import { generateId } from 'src/utils/generate-id';
import {
  BaseEntity as TypeOrmBaseEntity,
  BeforeInsert,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn('bigint')
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = generateId();
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}