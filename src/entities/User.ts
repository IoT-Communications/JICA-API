import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';



@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  username!: String;

  @Column({ unique: true})
  email!: string;

  @Column('text')
  password!: string;

  @Column({ nullable: true })
  fcmToken!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @DeleteDateColumn()
  deletedAt!: string;
}
