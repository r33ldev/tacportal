import { EnrolInputsOne, EnrolInputsThree, EnrolInputsTwo } from './inputs';

const validator = (field: any, fieldType?: string) => {
  if (field && field.length < 1) {
    return [
      {
        field,
        message: `Please provide your ${field}`,
      },
    ];
  }

  if (field && fieldType == 'email') {
    if (!field.includes('@')) {
      return [
        {
          field: 'email',
          message: 'Your email appears not to be valid',
        },
      ];
    }
  }

  if (field && fieldType == 'username') {
    if (field.includes('@')) {
      return [
        {
          field: 'username',
          message: 'Username cannot include an @',
        },
      ];
    }
  }
  if (field && fieldType == 'username') {
    if (field <= 3) {
      return [
        {
          field: 'username',
          message: 'Username must be greater than 3 characters',
        },
      ];
    }
  }
  if (field && fieldType == 'password') {
    if (field <= 5) {
      return [
        {
          field: 'password',
          message: 'Password must be greater than 6 characters',
        },
      ];
    }
  }

  return null;
};

export const validateEnrolInputsOne = (optionsOne: EnrolInputsOne) => {
  validator(optionsOne.surname);
  validator(optionsOne.address);
  validator(optionsOne.email, 'email');
  validator(optionsOne.examLocation);
  validator(optionsOne.matricLocation);
  validator(optionsOne.otherNames);
  validator(optionsOne.phoneNumber);
  return null;
};
export const validateEnrolInputsTwo = (optionsTwo: EnrolInputsTwo) => {
  validator(optionsTwo.courseName);
  // validator(optionsTwo.receipt);
  validator(optionsTwo.studentSchool);
  return null;
};
export const validateEnrolInputsThree = (optionsThree: EnrolInputsThree) => {
  validator(optionsThree.username, 'username');
  validator(optionsThree.password, 'password');
  return null;
};
