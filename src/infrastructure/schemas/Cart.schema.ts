import { z } from 'zod';

const cartCreationSchema = z
  .object({
    plate: z
      .string()
      .regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, 'Placa inválida'),
    isActive: z.boolean().optional(),
  })
  .strict('Campo desconhecido');

const cartEditSchema = z
  .object({
    plate: z
      .string()
      .regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, 'Placa inválida')
      .optional(),
    isActive: z.boolean().optional(),
  })
  .strict('Campo desconhecido');

export { cartCreationSchema, cartEditSchema };
