import { Types } from 'mongoose';

export type TItems = {
  product: Types.ObjectId;
  quantity: number;
  totalAmount: number;
}; 

export type TCart = {
  _id?: Types.ObjectId;
  user?: Types.ObjectId;
  orders: TItems[];
  status?: 'pending' | 'delivering' | 'delivered';
};
