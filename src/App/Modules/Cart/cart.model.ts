import { model, Schema } from "mongoose";
import { TCart, TItems } from "./cart.interface";

const itemSchema = new Schema<TItems>({
  product: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
}); ;

const cartSchema = new Schema<TCart>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    orders: { type: [itemSchema], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },

    status: {
      type: String,
      enum: ['pending', 'delivering', 'delivered'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['on-delivery', 'stripe'],
      default: 'on-delivery',
    },
    paymentId: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Cart = model('cart',cartSchema)