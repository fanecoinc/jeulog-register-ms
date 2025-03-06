import { Context } from 'moleculer';
import { StandardParameter } from '../parameters';
import { errorHandler } from '../errorHandler';
import { uuidSchema } from '@/infrastructure/schemas/Common.schema';
import {
  tagCreationSchema,
  tagEditSchema,
} from '@/infrastructure/schemas/Tag.schema';
import { CreateTagDTO } from '@/application/dtos/Tag.dto';
import { TagService } from '@/services/Tag.service';
import { PrismaTagRepository } from '@/infrastructure/adapters/Tag.prisma-adapter';

const tagRepository = new PrismaTagRepository();
const tagService = new TagService(tagRepository);

export const tagActions = {
  getTags: {
    handler: async (_ctx: Context) => {
      return await tagService.getAllTags().catch(errorHandler);
    },
    openapi: {
      description: 'Recupera todas as tags',
      summary: 'Recupera todas as tags',
    },
  },

  getTagById: {
    handler: async (ctx: Context<StandardParameter<CreateTagDTO>>) => {
      const { id } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      return await tagService.getTagById(id).catch(errorHandler);
    },
    openapi: {
      description: 'Recupera tag pelo ID',
      summary: 'Recupera tag pelo ID',
    },
  },

  createTag: {
    handler: async (ctx: Context<StandardParameter<CreateTagDTO>>) => {
      await tagCreationSchema.parseAsync(ctx.params).catch(errorHandler);
      return await tagService.createTag(ctx.params).catch(errorHandler);
    },
    openapi: {
      description: 'Criação de tag',
      summary: 'Criação de tag',
    },
    params: {
      name: { type: 'string', optional: false },
    },
  },

  editTag: {
    handler: async (ctx: Context<StandardParameter<CreateTagDTO>>) => {
      const { id, ...dto } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      await tagEditSchema.parseAsync(dto).catch(errorHandler);
      return await tagService.editTag(id, dto).catch(errorHandler);
    },
    openapi: {
      description: 'Edição de tag',
      summary: 'Edição de tag',
    },
    params: {
      name: { type: 'string', optional: true },
    },
  },

  deleteTag: {
    handler: async (ctx: Context<StandardParameter<CreateTagDTO>>) => {
      const { id } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      return await tagService.delete(id);
    },
    openapi: {
      description: 'Deleção de tag',
      summary: 'Deleção de tag',
    },
  },
};
