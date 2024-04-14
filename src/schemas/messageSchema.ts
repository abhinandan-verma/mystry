import {z} from "zod"


export const messageSchema = z.object({
    content: z
    .string()
    .min(10, {message: "content must be of at least 10 characters"})
    .max(300, {message: "content must be of no more than 300 characters"})

    
})