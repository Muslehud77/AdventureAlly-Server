import { z } from "zod";

const itemValidation = z.object({
  product: z.string().refine(val => val.match(/^[0-9a-fA-F]{24}$/), {
    message: 'Invalid product ID',
  }), // Assuming ObjectId as a 24-char hex string
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalAmount: z.number().min(0, 'Total amount must be non-negative'),
});


export const createCartValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    orders: z.array(itemValidation).min(1, 'Orders must contain at least one item'),
    status : z.enum(['pending','delivering','delivered']).optional(),
    address: z.string(),
    phone: z.string(),
    paymentId: z.string().optional(),
    paymentMethod: z.enum(["on-delivery","stripe"])
  }),
});

export const createPaymentIntentValidation = z.object({
  body: z.object({
    user: z.string().optional(),
    orders: z.array(itemValidation).min(1, 'Orders must contain at least one item'),
    status : z.enum(['pending','delivering','delivered']).optional(),
    address: z.string(),
    phone: z.string(),
  
  }),
});
