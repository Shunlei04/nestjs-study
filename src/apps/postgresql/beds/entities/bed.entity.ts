import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Bed extends AbstractEntity<Bed> {
  @Column({ nullable: false })
  bedNo: string;

  @Column({ nullable: true })
  // @ManyToOne(() => Ward, (ward) => ward.beds)
  wardId: number;
}
