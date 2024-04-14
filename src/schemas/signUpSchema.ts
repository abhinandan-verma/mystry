import {z} from 'zod'

export const userNameValidation = z
    .string()
    .min(2, "Username must be at least  2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special charater")


export const signUpSchema = z.object({
    usename: userNameValidation,
    email: z.string().email({message: 'Invalid Email Address'}),
    password: z.string().min(6,{message: 'password must be at least 6 characters'})
})