import { Field, InputType } from 'type-graphql';

@InputType()
export class SubscribeInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class ContactInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  subject?: string;

  @Field({ nullable: true })
  message?: string;
}

@InputType()
export class EnrolInputsOne {
  @Field({ nullable: true })
  surname?: string;

  @Field({ nullable: true })
  otherNames?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  examLocation?: string;

  @Field({ nullable: true })
  matricLocation?: string;
}

@InputType()
export class EnrolInputsTwo {
  @Field({ nullable: true })
  studentSchool?: string;

  @Field({ nullable: true })
  courseName?: string;

  // @Field({nullable:true})
  // receipt?: string;
}
@InputType()
export class EnrolInputsThree {
  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  usernameOrEmail: string;
  
  @Field()
  password: string
}