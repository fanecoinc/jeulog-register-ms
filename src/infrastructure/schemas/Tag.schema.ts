import { z } from 'zod';

const tagCreationSchema = z
  .object({
    name: z.string(),
  })
  .strict('Campo desconhecido inválido');

const tagEditSchema = z
  .object({
    name: z.string().optional(),
  })
  .strict('Campo desconhecido inválido');

export { tagCreationSchema, tagEditSchema };
