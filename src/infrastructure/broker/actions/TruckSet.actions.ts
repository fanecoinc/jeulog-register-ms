import { Context } from 'moleculer';
import { StandardParameter } from '../parameters';
import { errorHandler } from '../errorHandler';
import { uuidSchema } from '@/infrastructure/schemas/Common.schema';
import {
  truckSetCreationSchema,
  truckSetEditSchema,
} from '@/infrastructure/schemas/TruckSet.schema';
import { CreateTruckSetDTO } from '@/application/dtos/TruckSet.dto';
import { TruckSetService } from '@/services/TruckSet.service';
import { PrismaTruckSetRepository } from '@/infrastructure/adapters/TruckSet.prisma-adapter';
import { PrismaTruckTractorRepository } from '@/infrastructure/adapters/TruckTractor.prisma-adapter';
import { PrismaCartRepository } from '@/infrastructure/adapters/Cart.prisma-adapter';
import { PrismaPersonRepository } from '@/infrastructure/adapters/Person.prisma-adapter';

const truckSetRepository = new PrismaTruckSetRepository();
const truckTractorRepository = new PrismaTruckTractorRepository();
const cartRepository = new PrismaCartRepository();
const personRepository = new PrismaPersonRepository();
const truckSetService = new TruckSetService(
  truckSetRepository,
  truckTractorRepository,
  personRepository,
  cartRepository
);

export const truckSetActions = {
  getTruckSets: {
    handler: async (_ctx: Context) => {
      return await truckSetService.getAllTruckSets().catch(errorHandler);
    },
    openapi: {
      description: 'Recupera todos os conjuntos',
      summary: 'Recupera todos os conjuntos',
    },
  },

  createTruckSet: {
    handler: async (ctx: Context<StandardParameter<CreateTruckSetDTO>>) => {
      await truckSetCreationSchema.parseAsync(ctx.params).catch(errorHandler);
      return await truckSetService
        .createTruckSet(ctx.params)
        .catch(errorHandler);
    },
    openapi: {
      description: 'Criação de conjunto',
      summary: 'Criação de conjunto',
    },
    params: {
      dedicatedFleet: { type: 'boolean', optional: false },
      isBlocked: { type: 'boolean', optional: false },
      blockedDescription: { type: 'string', optional: true },
      truckTractorId: { type: 'string', format: 'uuid', optional: false },
      cartOneId: { type: 'string', format: 'uuid', optional: true },
      cartTwoId: { type: 'string', format: 'uuid', optional: true },
      cartThreeId: { type: 'string', format: 'uuid', optional: true },
      ownerId: { type: 'string', format: 'uuid', optional: true },
    },
  },
  getTruckSetById: {
    handler: async (ctx: Context<StandardParameter<CreateTruckSetDTO>>) => {
      const { id } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      return await truckSetService.getTruckSetById(id).catch(errorHandler);
    },
    openapi: {
      description: 'Recupera conjunto pelo ID',
      summary: 'Recupera conjunto pelo ID',
    },
  },

  editTruckSet: {
    handler: async (ctx: Context<StandardParameter<CreateTruckSetDTO>>) => {
      const { id, ...dto } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      await truckSetEditSchema.parseAsync(dto).catch(errorHandler);
      return await truckSetService.editTruckSet(id, dto).catch(errorHandler);
    },
    openapi: {
      description: 'Edição de conjunto',
      summary: 'Edição de conjunto',
    },
    params: {
      status: { type: 'string', optional: true },
      dedicatedFleet: { type: 'boolean', optional: true },
      isBlocked: { type: 'boolean', optional: true },
      blockedDescription: { type: 'string', optional: true },
      truckTractorId: { type: 'string', format: 'uuid', optional: false },
      cartOneId: { type: 'string', format: 'uuid', optional: true },
      cartTwoId: { type: 'string', format: 'uuid', optional: true },
      cartThreeId: { type: 'string', format: 'uuid', optional: true },
      ownerId: { type: 'string', format: 'uuid', optional: true },
    },
  },

  deleteTruckSet: {
    handler: async (ctx: Context<StandardParameter<CreateTruckSetDTO>>) => {
      const { id } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      return await truckSetService.deleteTruckSet(id).catch(errorHandler);
    },
    openapi: {
      description: 'Exclusão de conjunto',
      summary: 'Exclusão de conjunto',
      params: {
        id: { type: 'string', format: 'uuid', optional: false },
      },
    },
  },
};
