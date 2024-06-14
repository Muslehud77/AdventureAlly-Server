import { Schema, model } from 'mongoose';
import { TUser, TUserStatics } from './user.interface';
import AppError from '../../errors/AppError';

const userSchema = new Schema<TUser, TUserStatics>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);


userSchema.statics.isUserExists = async function(id:string){
    const user = await User.findById({_id:id})
    if(!user){
        throw new AppError()
    }
    return user
}


export const User = model<TUser, TUserStatics>('User', userSchema);
