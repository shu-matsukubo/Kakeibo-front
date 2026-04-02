import { z } from 'zod';

export const ExpenseSchema = z.object({
  id: z.string(),
  payment_method_name: z.string(),
  category_name: z.string(),
  amount: z.number(),
  point_amount: z.number(),
  date: z.string(),
});

export const ExpenseListSchema = z.array(ExpenseSchema);

export type Expense = z.infer<typeof ExpenseSchema>;
