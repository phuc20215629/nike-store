import * as z from "zod";

export const ProfileSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter your name",
  }),
  firstname: z.string(),
  surname: z.string(),
  phone: z.string().length(10, {
    message: "Please enter a valid phone number (10 digits)",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
