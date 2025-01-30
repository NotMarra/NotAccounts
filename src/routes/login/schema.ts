import { z } from "zod";
 
export const formSchema = z.object({
 username: z.string().min(2, { message: "Username must be longer than 2 characters"}).max(50),
 password: z.string(),
});
 
export type FormSchema = typeof formSchema;