import * as z from 'zod';

export const csvSchema = z.object({
  Matricula: z.string(),
})

export type CsvFormValues = z.infer<typeof csvSchema>;