import { z } from 'zod';

const personCreationSchema = z.object({
  legalPerson: z.boolean(),
  document: z.string(),
  name: z.string(),
  city: z.string(),
  state: z.string(),
  cep: z.string(),
  polygon: z
    .string()
    .regex(
      /^POLYGON\(\(\s*(-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s*,\s*){2,}-?\d+(\.\d+)?\s+-?\d+(\.\d+)?\s*\)\)$/,
      'Formato de POLYGON inválido'
    ),
  isHeadquarter: z.boolean(),
  isOrigin: z.boolean(),
  isDestiny: z.boolean(),
  isCarrier: z.boolean(),
  isActive: z.boolean().optional(),
  tagIds: z.array(z.string().uuid('UUID inválido')).optional(),
});

const personEditSchema = z.object({
  legalPerson: z.boolean().optional(),
  document: z.string().optional(),
  name: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  cep: z.string().optional(),
  polygon: z
    .array(
      z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)])
    )
    .min(3)
    .optional(),
  isHeadquarter: z.boolean().optional(),
  isOrigin: z.boolean().optional(),
  isDestiny: z.boolean().optional(),
  isCarrier: z.boolean().optional(),
  isActive: z.boolean().optional(),
  tagIds: z.array(z.string().uuid('UUID inválido')).optional(),
});

export { personCreationSchema, personEditSchema };
