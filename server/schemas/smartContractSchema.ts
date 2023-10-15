import { object, string, array } from 'zod';

export const createSmartContractSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    network: string({ required_error: 'Name is required' }),
  }),
});
