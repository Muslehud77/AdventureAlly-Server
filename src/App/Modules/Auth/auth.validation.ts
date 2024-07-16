import { z } from "zod";

const UserSignInValidation = z.object({
  body: z.object({
    email: z
      .string()
      .email({
        message: 'Invalid email address',
      })
      .nonempty({
        message: 'Email is required',
      }),
      password: z.string()
  }),
});

const makeAdmin = z.object({
  body:z.object({
    password : z.string()
  })
})

export const authValidation = {
  UserSignInValidation,
  makeAdmin,
};