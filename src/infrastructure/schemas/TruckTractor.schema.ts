import { z } from 'zod';

const truckTractorCreationSchema = z
  .object({
    plate: z
      .string()
      .regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, 'Placa inválida'),
    isTruck: z.boolean(),
    isActive: z.boolean().optional(),
  })
  .strict('Campo desconhecido');

const truckTractorEditSchema = z
  .object({
    plate: z
      .string()
      .regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, 'Placa inválida')
      .optional(),
    isTruck: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })
  .strict('Campo desconhecido');

export { truckTractorCreationSchema, truckTractorEditSchema };
