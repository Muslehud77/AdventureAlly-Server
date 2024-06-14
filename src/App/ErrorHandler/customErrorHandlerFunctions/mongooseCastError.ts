import mongoose from "mongoose";
import { TErrorSource, TSimplifiedError } from "../../interface/error";

export const mongooseCastError = (err:mongoose.Error.CastError) : TSimplifiedError=>{
    const errorSource : TErrorSource = [
        {
            path: err.path,
            message : err.message
        }
    ] 
    const statusCode = 400
    const message = "Invalid ID"
    return {
        statusCode,
        message,
        errorSource
    }
}