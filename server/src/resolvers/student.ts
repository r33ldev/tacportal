import { LoginInput } from "./../utils/inputs";
import {
  EnrolInputsOne,
  EnrolInputsTwo,
  EnrolInputsThree,
} from "../utils/inputs";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
// import { v4 } from 'uuid';
import argon2 from "argon2";
import { getConnection } from "typeorm";
import randomString from "randomstring";
import { Student } from "../entities/Student";
import { StudentResponse } from "../utils/response";
import {
  validateEnrolInputsOne,
  validateEnrolInputsThree,
  validateEnrolInputsTwo,
} from "../utils/validateEnrolInputs";
// import { Payment } from 'src/entities/Payment';

@Resolver()
export class StudentResolver {
  @Query(() => StudentResponse, { nullable: true })
  async students(): Promise<StudentResponse | null | any> {
    const students = await Student.find({});
    return { students };
  }

  @Mutation(() => StudentResponse, { nullable: true })
  async enrol(
    @Arg("optionsOne") optionsOne: EnrolInputsOne,
    @Arg("optionsTwo") optionsTwo: EnrolInputsTwo,
    @Arg("optionsThree") optionsThree: EnrolInputsThree
  ): Promise<StudentResponse | null> {
    // This code blocks only validate emptiness... more logic at the last validator
    const errorsOne = validateEnrolInputsOne(optionsOne);
    if (errorsOne) {
      return { errors: errorsOne };
    }

    // if code reach here, it means the first phase of input fields are all filled
    const errorsTwo = validateEnrolInputsTwo(optionsTwo);
    if (errorsTwo) {
      return { errors: errorsTwo };
    }

    // if code reach here, it means the second phase of input fields are all filled and user details can now validated finally and finally saved to database
    const errorsThree = validateEnrolInputsThree(optionsThree);
    if (errorsThree) {
      return { errors: errorsThree };
    }

    const hashedPassword = await argon2.hash(optionsThree.password);
    let uniqueId = randomString.generate(15);
    let student;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Student)
        .values({
          ...optionsOne,
          uniqueId,
          password: hashedPassword,
          username: optionsThree.username,
        })
        .returning("*")
        .execute();
      student = result.raw[0];
    } catch (err) {
      console.log("error in creating student account: ", err);
    }
    return { student };
  }

  @Mutation(() => StudentResponse, { nullable: true })
  async login(
    @Arg("options") options: LoginInput
  ): Promise<StudentResponse | null> {
    const student = await Student.findOne(
      options.usernameOrEmail.includes("@")
        ? { where: { email: options.usernameOrEmail } }
        : { where: { username: options.usernameOrEmail } }
    );
    if (!student) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username does not exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(student.password as string, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Password not correct",
          },
        ],
      };
    }
    return { student };


  }
}
