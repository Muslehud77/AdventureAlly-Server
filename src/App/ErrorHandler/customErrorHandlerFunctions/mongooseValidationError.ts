import mongoose from "mongoose";
import { TErrorSource, TSimplifiedError } from "../../interface/error";

export const handleMongooseValidation = (err: mongoose.Error.ValidationError):TSimplifiedError => {


    const errorSource : TErrorSource = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{
        return {
            path: value?.path,
            message : value?.path
        }
    }) 

    const statusCode = 400
    const message = "Validation Error"

    return {
        statusCode,
        message,
        errorSource
    }


}