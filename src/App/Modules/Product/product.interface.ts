export type TProduct = {
  _id?: string;
  name: string;
  category : string;
  price: number;
  stock: number;
  description: string;
  ratings: number;
  isDeleted?: boolean;
  images?: string[];
  sales?: number;
};
