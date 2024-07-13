/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TCart } from "./cart.interface";
import { Cart } from "./cart.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Product } from "../Product/product.model";

const addCartIntoDB = async(userId:string,cartData:TCart)=>{

    const session = await mongoose.startSession()



    try{
        session.startTransaction()

        const addCart = await Cart.create([{user:userId,...cartData}],{session})

        if(!addCart[0]){
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,'Cart is not saved!')
        }

        const bulkUpdateProductQuantity = cartData.orders.map(({product,quantity})=>({
            updateOne : {
                filter : {_id: product},
                update: {$inc: {stock:-quantity,sales:+quantity}}
            }
        }))

        const result = await Product.bulkWrite(bulkUpdateProductQuantity,{session})

        if(!result){
              throw new AppError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Cart is not saved, error updating the quantity!',
              );
        }

        await session.commitTransaction()
        await session.endSession()
        return result
    }catch(err:any){
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message || 'Cart is not saved something went wrong')
    }

}

const getMyCartFromDB = async(userId:string)=>{
    const result = await Cart.find({ user: userId }).populate('orders.product');
    return result
}

const getAllCartsFromDB = async()=>{
    const result = await Cart.find().populate('user')
    return result
}

const changeStatusOfCartIntoDB = async(cartId:string,status:string)=>{
    const result = await Cart.findByIdAndUpdate({_id:cartId},{status},{new:true})
    return result
}

export const cartServices = {
    getAllCartsFromDB,getMyCartFromDB,
    changeStatusOfCartIntoDB,addCartIntoDB
}