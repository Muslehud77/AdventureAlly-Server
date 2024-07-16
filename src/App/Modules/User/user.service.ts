import { TUser } from "./user.interface";
import { User } from "./user.model";

const updateUserIntoDB = async (id:string,userData: Partial<TUser>) => {

    await User.isUserExists(id)

    const result = await User.findByIdAndUpdate({_id:id},userData,{new:true})
    return result
};


const deleteUserInDB = async (id:string) => {
    await User.isUserExists(id);
    const result = await User.findByIdAndUpdate({_id:id},{isDeleted:true})
    return result
};


const getAllUsersFromDB = async()=>{
  const result = await User.find()
  return result
}

const changeStatusOfUserInDB = async(id:string,status:{status: "in-progress" | "blocked"})=>{
   await User.isUserExists(id);

   const result = await User.findByIdAndUpdate({ _id: id }, status, {
     new: true,
   });
   return result;
}

const makeAdminFromUser = async(id:string)=>{
   await User.isUserExists(id);

   const result = await User.findByIdAndUpdate({ _id: id }, {role:"admin"}, {
     new: true,
   });
   return result;
}

export const userServices = {
  updateUserIntoDB,
  deleteUserInDB,
  getAllUsersFromDB,
  changeStatusOfUserInDB,
  makeAdminFromUser,
};