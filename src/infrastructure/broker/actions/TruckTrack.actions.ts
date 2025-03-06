import { Context } from 'moleculer';
import { StandardParameter } from '../parameters';
import { errorHandler } from '../errorHandler';
import { uuidSchema } from '@/infrastructure/schemas/Common.schema';
import {
  truckTractorCreationSchema,
  truckTractorEditSchema,
} from '@/infrastructure/schemas/TruckTractor.schema';
import { CreateTruckTractorDTO } from '@/application/dtos/TruckTractor.dto';
import { TruckTractorService } from '@/services/TruckTractor.service';
import { PrismaTruckTractorRepository } from '@/infrastructure/adapters/TruckTractor.prisma-adapter';

const truckTractorRepository = new PrismaTruckTractorRepository();
const truckTractorService = new TruckTractorService(truckTractorRepository);

export const truckTrackActions = {
  getTruckTractors: {
    handler: async (_ctx: Context) => {
      return await truckTractorService
        .getAllTruckTractors()
        .catch(errorHandler);
    },
    openapi: {
      description: 'Recupera todos os cavalos',
      summary: 'Recupera todos os cavalos',
    },
  },

  getTruckTractorById: {
    handler: async (ctx: Context<StandardParameter<CreateTruckTractorDTO>>) => {
      const { id } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      return await truckTractorService
        .getTruckTractorById(id)
        .catch(errorHandler);
    },
    openapi: {
      description: 'Recupera cavalo pelo ID',
      summary: 'Recupera cavalo pelo ID',
    },
  },

  createTruckTractor: {
    handler: async (ctx: Context<StandardParameter<CreateTruckTractorDTO>>) => {
      await truckTractorCreationSchema
        .parseAsync(ctx.params)
        .catch(errorHandler);
      return await truckTractorService
        .createTruckTractor(ctx.params)
        .catch(errorHandler);
    },
    openapi: {
      description: 'Criação de cavalo',
      summary: 'Criação de cavalo',
    },
    params: {
      plate: { type: 'string', optional: false },
      isTruck: { type: 'boolean', optional: false },
      isActive: { type: 'boolean', optional: true },
    },
  },

  editTruckTractor: {
    handler: async (ctx: Context<StandardParameter<CreateTruckTractorDTO>>) => {
      const { id, ...dto } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      await truckTractorEditSchema.parseAsync(dto).catch(errorHandler);
      return await truckTractorService
        .editTruckTractor(id, dto)
        .catch(errorHandler);
    },
    openapi: {
      description: 'Edição de cavalo',
      summary: 'Edição de cavalo',
    },
    params: {
      plate: { type: 'string', optional: true },
      isTruck: { type: 'boolean', optional: true },
      isActive: { type: 'boolean', optional: true },
    },
  },
};
