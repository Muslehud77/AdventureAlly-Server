import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
  phone: string;
  address: string;
  isDeleted?: boolean;
  status? : "in-progress" | "blocked"
};


export interface TUserStatics extends Model<TUser>{
  isUserExists(id:string) : Promise<boolean>
} 