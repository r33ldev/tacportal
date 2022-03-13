import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity, PrimaryGeneratedColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class School extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  schoolName: string;

  @Field()
  @Column()
  schoolFees?: number;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column()
  numberOfStudents?: number;

  @Field()
  @Column()
  typeOfSchool?: string;

  @Field()
  @Column()
  duration: number;
}
