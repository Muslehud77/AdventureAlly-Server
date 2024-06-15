import { Schema, model } from 'mongoose';
import { TUser, TUserStatics } from './user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import configs from '../../configs';

const userSchema = new Schema<TUser, TUserStatics>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    role: { type: String, enum: ['admin', 'user'], required: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: {type: String,enum : ["in-Progress","blocked"],default:"in-progress"},
    isDeleted: {type: Boolean,default:false},
  },
  {
    timestamps: true,
  },
);


userSchema.statics.isUserExists = async function(id:string){
    const user = await User.findById({_id:id})
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,"User does not exist!")
    }
    return user
}

userSchema.statics.isUserHasAccess = async function (id: string) {
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  if(user?.isDeleted){
     throw new AppError(httpStatus.BAD_REQUEST, 'User is Deleted!');
  }
  if(user?.status === 'blocked'){
     throw new AppError(httpStatus.BAD_REQUEST, 'User is Blocked!');
  }
  return user;
};



userSchema.pre('save',async function(){
    const password = this?.password

    const encryptedPassword = await bcrypt.hash(password,configs.saltRounds)

    this.password = encryptedPassword;
})


export const User = model<TUser, TUserStatics>('User', userSchema);
