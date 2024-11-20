import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Ward extends AbstractEntity<Ward> {
  @Column({ nullable: false, unique: true })
  wardName: string;

  @Column({ nullable: true })
  bedId: number;

  // @OneToMany(() => Bed, (bed) => bed.ward)
  // beds: Bed[];
}
