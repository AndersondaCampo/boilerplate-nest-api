import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { DomainEvent } from './domain-events/domain-event';

export abstract class AggregateRoot extends BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  domainEvents: DomainEvent[] = [];
}