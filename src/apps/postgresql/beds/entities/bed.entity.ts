import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Ward } from '../../wards/entities/ward.entity';

@Entity()
export class Bed extends AbstractEntity<Bed> {
  @Column({ nullable: false })
  bedNo: string;

  @Column()
  description: string;

  // @Column({ nullable: true })
  @ManyToOne(() => Ward, (ward) => ward.beds)
  ward: Ward;
}
