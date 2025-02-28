import { Context } from 'moleculer';
import { StandardParameter } from '../parameters';
import { errorHandler } from '../errorHandler';
import { uuidSchema } from '@/infrastructure/schemas/Common.schema';
import {
  personCreationSchema,
  personEditSchema,
} from '@/infrastructure/schemas/Person.schema';
import {
  CreatePersonDTO,
  UpdatePersonDTO,
} from '@/application/dtos/Person.dto';
import { PersonService } from '@/services/Person.service';
import { PrismaPersonRepository } from '@/infrastructure/adapters/Person.prisma-adapter';
import { PrismaTagRepository } from '@/infrastructure/adapters/Tag.prisma-adapter';

const tagRepository = new PrismaTagRepository();
const personRepository = new PrismaPersonRepository();
const personService = new PersonService(personRepository, tagRepository);

export const personActions = {
  getPersons: {
    handler: async (_ctx: Context) => {
      return await personService.getAllPersons().catch(errorHandler);
    },
    openapi: {
      description: 'Recupera todas as pessoas',
      summary: 'Recupera todas as pessoas',
    },
  },

  getPersonById: {
    handler: async (ctx: Context<StandardParameter<CreatePersonDTO>>) => {
      const { id } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      return await personService.getPersonById(id).catch(errorHandler);
    },
    openapi: {
      description: 'Recupera pessoa pelo ID',
      summary: 'Recupera pessoa pelo ID',
    },
  },

  createPerson: {
    handler: async (ctx: Context<StandardParameter<CreatePersonDTO>>) => {
      await personCreationSchema.parseAsync(ctx.params).catch(errorHandler);
      return await personService.createPerson(ctx.params).catch(errorHandler);
    },
    openapi: {
      description: 'Criação de pessoa',
      summary: 'Criação de pessoa',
    },
    params: {
      legalPerson: { type: 'boolean', optional: false },
      document: { type: 'string', optional: false },
      name: { type: 'string', optional: false },
      city: { type: 'string', optional: false },
      state: { type: 'string', optional: false },
      cep: { type: 'string', optional: false },
      latitude: { type: 'number', optional: true },
      longitude: { type: 'number', optional: true },
      polygon: { type: 'string', optional: false },
      isHeadquarter: { type: 'boolean', optional: false },
      isOrigin: { type: 'boolean', optional: false },
      isDestiny: { type: 'boolean', optional: false },
      isCarrier: { type: 'boolean', optional: false },
      isActive: { type: 'boolean', optional: true },
      tagIds: { type: 'array', items: { type: 'string' }, optional: true },
    },
  },

  editPerson: {
    handler: async (ctx: Context<StandardParameter<UpdatePersonDTO>>) => {
      const { id, ...dto } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      await personEditSchema.parseAsync(dto).catch(errorHandler);
      return await personService.editPerson(id, dto);
    },
    openapi: {
      description: 'Edição de pessoa',
      summary: 'Edição de pessoa',
    },
    params: {
      legalPerson: { type: 'boolean', optional: true },
      document: { type: 'string', optional: true },
      name: { type: 'string', optional: true },
      city: { type: 'string', optional: true },
      state: { type: 'string', optional: true },
      cep: { type: 'string', optional: true },
      latitude: { type: 'number', optional: true },
      longitude: { type: 'number', optional: true },
      polygon: { type: 'string', optional: true },
      isHeadquarter: { type: 'boolean', optional: true },
      isOrigin: { type: 'boolean', optional: true },
      isDestiny: { type: 'boolean', optional: true },
      isCarrier: { type: 'boolean', optional: true },
      isActive: { type: 'boolean', optional: true },
      tagIds: { type: 'array', items: { type: 'string' }, optional: true },
    },
  },
};
