import {z} from 'zod';


export const SingInSchema = z.object({
    email: z.string().email().min(1,{
        message: "Email must be at least 5 charac5ers.",
      }).max(50,{message: "Too long.",}),
    password: z.string().min(1,{
        message: "Password must be at least 8 characters.",
      }).max(20,{message: "Too long.",}),

})

export const SingUpSchema = z.object({
    name: z.string().min(2,{
        message: "Username must be at least 2 characters.",
      }).max(20, {message: "Too long.",}),
    email: z.string().email().min(5,{
      message: "Email must be at least 5 characters.",
    }).max(50,{message: "Too long.",}),
    password: z.string().min(5,{
      message: "Password must be at least 8 characters.",
    }).max(20,{message: "Too long.",}),
})