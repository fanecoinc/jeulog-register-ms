import { z } from 'zod';
import { TruckSetStatus } from '@/domain/enums/TruckSetStatus';

const truckSetCreationSchema = z.object({
  dedicatedFleet: z.boolean(),
  blockedDescription: z.string().optional(),
  truckTractorId: z.string().uuid('UUID Inválido'),
  cartOneId: z.string().uuid('UUID Inválido').optional(),
  cartTwoId: z.string().uuid('UUID Inválido').optional(),
  cartThreeId: z.string().uuid('UUID Inválido').optional(),
  ownerId: z.string().uuid('UUID Inválido').optional(),
});

const truckSetEditSchema = z.object({
  status: z.nativeEnum(TruckSetStatus).optional(),
  dedicatedFleet: z.boolean().optional(),
  blockedDescription: z.string().optional(),
  truckTractorId: z.string().uuid('UUID Inválido').optional(),
  cartOneId: z.string().uuid('UUID Inválido').optional(),
  cartTwoId: z.string().uuid('UUID Inválido').optional(),
  cartThreeId: z.string().uuid('UUID Inválido').optional(),
  ownerId: z.string().uuid('UUID Inválido').optional(),
});

export { truckSetCreationSchema, truckSetEditSchema };
