import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Department extends AbstractEntity<Department> {
  @Column({ nullable: true, unique: true })
  name: string;

  @Column()
  description: string;
}
