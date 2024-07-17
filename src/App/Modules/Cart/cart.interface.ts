import { Types } from 'mongoose';

export type TItems = {
  product: Types.ObjectId;
  name?:string;
  quantity: number;
  totalAmount: number;
  image?:string;
}; 

export type TCart = {
  _id?: Types.ObjectId;
  user?: Types.ObjectId;
  orders: TItems[];
  status?: 'pending' | 'delivering' | 'delivered';
  address: string;
  phone: string;
  paymentId?: string;
  paymentMethod: "on-delivery" | "stripe"
};
