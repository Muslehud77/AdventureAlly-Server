import QueryBuilder from "../../builder/QueryBuilder"
import { TProduct } from "./product.interface"
import { Product } from "./product.model"

const getAllProductsFromDB = async(query:Record<string,unknown>)=>{
    const productQuery = new QueryBuilder(Product.find(),query).search(["name","description"]).filter().sort().paginate().fieldQuery()


    const result = await productQuery.modelQuery 
    const meta = await productQuery.countTotal()
    return {result,meta}
}


const createAProductIntoDB = async(product:TProduct)=>{
    const result = await Product.create(product)
    return result
}
const updateAProductIntoDB = async(id:string,product:TProduct)=>{
    const result = await Product.findByIdAndUpdate({_id:id},product,{new:true})
    return result
}
const deleteAProductFromDB = async(id:string)=>{
    const result = await Product.findByIdAndUpdate({_id:id},{isDeleted:true},{new:true})
    return result
}



const getProductByIdFromDB = async(id:string)=>{
    const result = await Product.findById({_id:id})
    return result
}
const getDeletedProductsFromDB = async()=>{
    const result = await Product.find({isDeleted:true})
    return result
}

const getBestSellingFromDB = async()=>{
     const result = await Product.find({ isDeleted: false }) 
       .sort({ sales: -1 }) 
       .limit(6); 

     return result;
}

const getRandomProductsFromDB = async()=>{
     const result = await Product.aggregate([
       { $match: { isDeleted: false } }, 
       { $sample: { size: 3 } }, 
     ]);

     return result
}


export const ProductServices = {
  getAllProductsFromDB,
  createAProductIntoDB,
  getProductByIdFromDB,
  updateAProductIntoDB,
  deleteAProductFromDB,
  getDeletedProductsFromDB,
  getBestSellingFromDB,
  getRandomProductsFromDB,
};