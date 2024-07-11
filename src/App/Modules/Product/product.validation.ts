import { z } from "zod";


const imageSchema = z.string().url();

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    stock: z.number().min(0, 'Stock must be a positive number'),
    description: z.string().min(1, 'Description is required'),
    ratings: z.number().min(0).default(0),
    isDeleted: z.boolean().default(false),
    images: z.array(imageSchema).default([]),
    createdAt: z.date().optional(), // For timestamps
    updatedAt: z.date().optional(), // For timestamps
  }),
});

export const updateProductValidationSchema = createProductValidationSchema.deepPartial()