import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createUserIntoDB = catchAsync(async (req,res)=>{

    const userData = req.body

    const result = await userServices.createUserIntoDB(userData) ;


    const data = {
      success: true,
      statusCode: 200,
      message: 'User registered successfully',
    };

})