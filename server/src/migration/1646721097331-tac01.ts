import {MigrationInterface, QueryRunner} from "typeorm";

export class tac011646721097331 implements MigrationInterface {
    name = 'tac011646721097331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "paymentConfirmed" boolean NOT NULL, "paymentFor" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "subject" character varying NOT NULL, "message" character varying NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."student_gender_enum" AS ENUM('Female', 'Male')`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "uniqueId" character varying NOT NULL, "surname" character varying NOT NULL, "otherNames" character varying, "dateOfBirth" TIMESTAMP, "email" character varying NOT NULL, "location" character varying, "phoneNumber" character varying, "gender" "public"."student_gender_enum", "stateOfOrigin" character varying, "lgaOfOrigin" character varying, "guarantorName" character varying, "guarantorPhoneNumber" character varying, "passportPhoto" character varying, "about" character varying, "guarantorAddress" character varying, "paymentConfirmed" boolean DEFAULT false, "studentSchool" character varying, "courseName" character varying, "amountPaid" integer, "active" boolean DEFAULT true, "username" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "UQ_00ab250b7111913d473d352bd59" UNIQUE ("phoneNumber"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school" ("id" SERIAL NOT NULL, "schoolName" character varying NOT NULL, "schoolFees" integer NOT NULL, "location" character varying NOT NULL, "numberOfStudents" integer NOT NULL, "typeOfSchool" character varying NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriber" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_073600148a22d05dcf81d119a6a" UNIQUE ("email"), CONSTRAINT "PK_1c52b7ddbaf79cd2650045b79c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscriber"`);
        await queryRunner.query(`DROP TABLE "school"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_gender_enum"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
