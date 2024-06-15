import { TUser } from "./user.interface";
import { User } from "./user.model";

const updateUserIntoDB = async (id:string,userData: Partial<TUser>) => {

    await User.isUserExists(id)

    const result = await User.findByIdAndUpdate({_id:id},userData)
    return result
};


const deleteUserInDB = async (id:string) => {
    await User.isUserExists(id);
    const result = await User.findByIdAndUpdate({_id:id},{isDeleted:true})
    return result
};

export const userServices = {
  updateUserIntoDB,
  deleteUserInDB,
};