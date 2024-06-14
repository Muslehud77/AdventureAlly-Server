import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
  phone: string;
  address: string;
};


export interface TUserStatics extends Model<TUser>{
  isUserExists(id:string) : Promise<boolean>
} 