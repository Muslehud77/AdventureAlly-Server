import { USER_ROLE } from "./auth.constant";

export type TUserSignIn = {
    email : string,
    password : string
}
export type TUserRole = {
  admin: 'admin';
  user: 'user';
};

export type TRequiredRoles = keyof typeof USER_ROLE

