import { object, string, TypeOf } from "zod";

export const generateJwtTokenSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email({ message: "This is not an email" }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
  }),
});

export type generateJwtTokenInput = Omit<
  TypeOf<typeof generateJwtTokenSchema>,
  "body.email" | "body.password"
>;
