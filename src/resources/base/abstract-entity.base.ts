import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn as ModifiedDateColumn,
} from 'typeorm';
import { YesNoEnum } from '../enum/yes-no.enum';

export abstract class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @ModifiedDateColumn()
  updatedDate: Date;

  @Column({ default: YesNoEnum.YES })
  active: YesNoEnum;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
