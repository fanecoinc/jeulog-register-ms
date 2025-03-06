import { z } from 'zod';

const tagCreationSchema = z
  .object({
    name: z.string(),
  })
  .strict('Campo desconhecido');

const tagEditSchema = z
  .object({
    name: z.string().optional(),
  })
  .strict('Campo desconhecido');

export { tagCreationSchema, tagEditSchema };
