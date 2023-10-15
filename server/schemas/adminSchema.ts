import { object, string, TypeOf } from "zod";

export const createAdminSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    ip: string({
      required_error: "Ip is required",
    }),
    role: string({
      required_error: "Role is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const searchAdminSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export type CreateAdminInput = Omit<
  TypeOf<typeof createAdminSchema>,
  "body.passwordConfirmation"
>;

export type searchAdminInput = Omit<TypeOf<typeof searchAdminSchema>, "">;
