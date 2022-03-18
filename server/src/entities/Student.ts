import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum genderType {
  F = 'Female',
  M = 'Male',
}

@ObjectType()
@Entity()
export class Student extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  uniqueId: string;

  @Field()
  @Column()
  surname?: string;

  @Field()
  @Column({nullable: true, default: null})
  otherNames?: string;

  @Field(() => String)
  @Column({nullable: true, default: null})
  dateOfBirth?: Date;

  @Field()
  @Column({ unique: true })
  email?: string;

  @Field()
  @Column({nullable: true, default: null})
  location?: string;

  @Field()
  @Column({ unique: true, nullable: true })
  phoneNumber?: string;

  @Field()
  @Column({ type: 'enum', enum: genderType, nullable: true })
  gender?: genderType;

  @Field()
  @Column({nullable: true, default: null})
  stateOfOrigin?: string;

  @Field()
  @Column({nullable: true, default: null})
  lgaOfOrigin?: string;

  @Field()
  @Column({nullable: true, default: null})
  guarantorName?: string;

  @Field()
  @Column({nullable: true, default: null})
  guarantorPhoneNumber?: string;

  @Field()
  @Column({nullable: true, default: null})
  passportPhoto?: string;

  @Field()
  @Column({nullable: true, default: null})
  about?: string;

  @Field()
  @Column({nullable: true, default: null})
  guarantorAddress?: string;

  // @Field()
  // @OneToMany(() => Payment, (payment) => payment.receipt)
  // receipt: Payment[];

  @Field()
  @Column({default: false, nullable: true})
  paymentConfirmed?: boolean;

  @Field()
  @Column({nullable: true, default: null})
  studentSchool?: string;


  @Field()
  @Column({nullable: true, default: null})
  courseName?: string;

  @Field()
  @Column({nullable: true, default: null})
  amountPaid?: number;

  @Field()
  @Column({nullable: true, default: true})
  active?: boolean;

  @Field()
  @Column({})
  username?: string;

  @Field()
  @Column()
  password: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;
}
