import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const imageSchema = {type:String}

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    images: { type: [imageSchema], default: [] },
    sales: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const Product = model('product',productSchema)