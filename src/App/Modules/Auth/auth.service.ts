import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

export const userServices = {
  createUserIntoDB
};
