import { Title } from 'src/apps/main/titles/entities/title.entity';
import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { YesNoEnum } from 'src/resources/enum/yes-no.enum';
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

  @Column({ default: YesNoEnum.NO })
  isLocked: YesNoEnum;

  @Column({ nullable: true, default: YesNoEnum.NO })
  isAdmin: YesNoEnum;
}
