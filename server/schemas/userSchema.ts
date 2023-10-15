import { number, object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    age: number({
      required_error: 'Age is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const changePasswordSchema = object({
  body: object({
    oldPassword: string({
      required_error: 'Old Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    newPassword: string({
      required_error: 'New Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    newPasswordConfirmation: string({
      required_error: 'Password Confirmation is required',
    }),
  }).refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: 'Passwords do not match',
    path: ['newPasswordConfirmation'],
  }),
});

export const editUserSchema = object({
  body: object({
    name: string({}).optional(),
    email: string({}).email('Not a valid email').optional(),
    age: number().optional(),
  }),
});

export const searchUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export const addBlockChainSchema = object({
  body: object({
    smartContract: string({ required_error: 'Smart Contract is required' }),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;

export type searchUserInput = Omit<TypeOf<typeof searchUserSchema>, ''>;
