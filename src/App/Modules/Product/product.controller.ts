import catchAsync from "../../utils/catchAsync";
import { sendResponse,TMeta } from "../../utils/sendResponse";
import { TProduct } from "./product.interface";
import { ProductServices } from "./product.service";

const getAllProducts = catchAsync(async (req, res) => {
 
    const query = req.query

  const result = await ProductServices.getAllProductsFromDB(query) as unknown as {result : TProduct[],meta:TMeta}

  const data = {
    success: true,
    statusCode: 200,
    message: 'Products retrieved successfully!',
    meta: result.meta,
    data: result.result,
  };

  sendResponse<TProduct[]>(res, data);
});


const createAProduct = catchAsync(async (req, res) => {
 
    const product = req.body

  const result = (await ProductServices.createAProductIntoDB(
    product
  )) as unknown as TProduct

  const data = {
    success: true,
    statusCode: 200,
    message: 'Product created successfully',
    data: result,
  };

  sendResponse<TProduct>(res, data);
});


const updateProduct = catchAsync(async (req, res) => {
    
    const id = req.params.id
    const product = req.body

  const result = (await ProductServices.updateAProductIntoDB(id,
    product
  )) as unknown as TProduct

  const data = {
    success: true,
    statusCode: 200,
    message: 'Product created successfully',
    data: result,
  };

  sendResponse<TProduct>(res, data);
});

const getProductById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = (await ProductServices.getProductByIdFromDB(
    id
  )) as unknown as TProduct;

  const data = {
    success: true,
    statusCode: 200,
    message: 'Got the product successfully',
    data: result,
  };

  sendResponse<TProduct>(res, data);
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = (await ProductServices.deleteAProductFromDB(
    id
  )) as unknown as TProduct;

  const data = {
    success: true,
    statusCode: 200,
    message: 'Deleted product successfully',
    data: result,
  };

  sendResponse<TProduct>(res, data);
});

 const getDeletedProducts = catchAsync(async (req, res) => {

   const result = (await ProductServices.getDeletedProductsFromDB()) as unknown as TProduct[];

   const data = {
     success: true,
     statusCode: 200,
     message: 'Deleted product retrieved successfully',
     data: result,
   };

   sendResponse<TProduct[]>(res, data);
 });


 export const productControllers = {
   getProductById,
   getAllProducts,
   createAProduct,
   updateProduct,
   deleteProduct,
   getDeletedProducts,
 };