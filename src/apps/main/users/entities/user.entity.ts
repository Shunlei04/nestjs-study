import { Title } from 'src/apps/main/titles/entities/title.entity';
import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ nullable: true })
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @ManyToOne(() => Title, (title) => title)
  title: string;

  @Column({ nullable: true })
  // @Check(`dateOfBirth <= '2006-12-31'`)
  dateOfBirth: Date;
}
