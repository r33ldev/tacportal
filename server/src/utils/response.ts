import { Contact } from '../entities/Contact';
import { Subscriber } from '../entities/Subscriber';
import { Field, ObjectType } from 'type-graphql';
import { Student } from '../entities/Student';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class SubscribeResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Subscriber, { nullable: true })
  subscriber?: Subscriber;
}

@ObjectType()
export class StudentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Student, { nullable: true })
  student?: Student;
}

@ObjectType()
export class ContactResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Contact, { nullable: true })
  contact?: Contact[];
}
