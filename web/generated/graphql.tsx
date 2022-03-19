import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string; 
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AllContacts = {
  __typename?: 'AllContacts';
  contacts: Array<Contact>;
};

export type Contact = {
  __typename?: 'Contact';
  email: Scalars['String'];
  id: Scalars['Float'];
  message: Scalars['String'];
  name: Scalars['String'];
  subject: Scalars['String'];
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
};

export type EnrolInputsOne = {
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  examLocation?: InputMaybe<Scalars['String']>;
  matricLocation?: InputMaybe<Scalars['String']>;
  otherNames?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
};

export type EnrolInputsThree = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type EnrolInputsTwo = {
  courseName?: InputMaybe<Scalars['String']>;
  studentSchool?: InputMaybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  enrol?: Maybe<StudentResponse>;
  login: StudentResponse;
  newContact?: Maybe<Contact>;
  subscribe?: Maybe<SubscribeResponse>;
};


export type MutationEnrolArgs = {
  optionsOne: EnrolInputsOne;
  optionsThree: EnrolInputsThree;
  optionsTwo: EnrolInputsTwo;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationNewContactArgs = {
  options: ContactInput;
};


export type MutationSubscribeArgs = {
  options: SubscribeInput;
};

export type Query = {
  __typename?: 'Query';
  allContacts?: Maybe<AllContacts>;
  getContact?: Maybe<Contact>;
  students?: Maybe<StudentResponse>;
  subscriber?: Maybe<SubscribeResponse>;
  subscribers?: Maybe<Subscriber>;
};


export type QueryGetContactArgs = {
  subject: Scalars['String'];
};


export type QuerySubscriberArgs = {
  email: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  about: Scalars['String'];
  active: Scalars['Boolean'];
  amountPaid: Scalars['Float'];
  courseName: Scalars['String'];
  createdAt: Scalars['String'];
  dateOfBirth: Scalars['String'];
  email: Scalars['String'];
  gender: Scalars['String'];
  guarantorAddress: Scalars['String'];
  guarantorName: Scalars['String'];
  guarantorPhoneNumber: Scalars['String'];
  id: Scalars['Float'];
  lgaOfOrigin: Scalars['String'];
  location: Scalars['String'];
  otherNames: Scalars['String'];
  passportPhoto: Scalars['String'];
  password: Scalars['String'];
  paymentConfirmed: Scalars['Boolean'];
  phoneNumber: Scalars['String'];
  stateOfOrigin: Scalars['String'];
  studentSchool: Scalars['String'];
  surname: Scalars['String'];
  uniqueId: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type SubscribeInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SubscribeResponse = {
  __typename?: 'SubscribeResponse';
  errors?: Maybe<Array<FieldError>>;
  subscriber?: Maybe<Subscriber>;
};

export type Subscriber = {
  __typename?: 'Subscriber';
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type MiniStudentResponseFragment = { __typename?: 'Student', id: number, uniqueId: string, email: string, createdAt: string, username: string, active: boolean };

export type StudentResponseFragment = { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, uniqueId: string, email: string, createdAt: string, username: string, active: boolean } | null };

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'StudentResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, student?: { __typename?: 'Student', id: number, uniqueId: string, email: string, createdAt: string, username: string, active: boolean } | null } };

export const MiniStudentResponseFragmentDoc = gql`
    fragment MiniStudentResponse on Student {
  id
  uniqueId
  email
  createdAt
  username
  active
}
    `;
export const StudentResponseFragmentDoc = gql`
    fragment StudentResponse on StudentResponse {
  errors {
    field
    message
  }
  student {
    ...MiniStudentResponse
  }
}
    ${MiniStudentResponseFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    ...StudentResponse
  }
}
    ${StudentResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;