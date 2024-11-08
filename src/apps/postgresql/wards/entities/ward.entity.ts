import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Ward extends AbstractEntity<Ward> {
  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}
