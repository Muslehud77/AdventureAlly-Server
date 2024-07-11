const { z } = require('zod');

 const createUserValidation = z.object({
   body: z.object({
     name: z.string({
       required_error: 'Name is required',
       invalid_type_error: 'Name must be a string',
     }),
     email: z
       .string()
       .email({
         message: 'Invalid email address',
       })
       .nonempty({
         message: 'Email is required',
       }),
     role: z.enum(['admin', 'user'], {
       required_error: 'Role is required',
       invalid_type_error: "Role must be either 'admin' or 'user'",
     }),
     password: z
       .string({
         required_error: 'Password is required',
         invalid_type_error: 'Password must be a string',
       })
       .nonempty({
         message: 'Password is required',
       }),
     phone: z.string({
       required_error: 'Phone number is required',
       invalid_type_error: 'Phone number must be a string',
     }),
     address: z.string({
       required_error: 'Address is required',
       invalid_type_error: 'Address must be a string',
     }),
     image: z.string().optional(),
     status: z
       .enum(['in-progress', 'blocked'], {
         invalid_type_error: "Status must be either 'in-Progress' or 'blocked'",
       })
       .default('in-progress').optional(),
     isDeleted: z.boolean().default(false).optional(),
   }),
 });


const updateUserValidation = createUserValidation.deepPartial()


export const userValidation = {
  createUserValidation,
  updateUserValidation,
};