import { UserRoleEnum } from '@prisma/client';

export interface ISignUpUser {
  email: string;
  password: string;
  role: UserRoleEnum;
}

export interface ISignInUser {
  email: string;
  password: string;
}
