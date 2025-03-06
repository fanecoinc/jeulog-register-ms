import { Context } from 'moleculer';
import { StandardParameter } from '../parameters';
import { errorHandler } from '../errorHandler';
import { uuidSchema } from '@/infrastructure/schemas/Common.schema';
import {
  cartCreationSchema,
  cartEditSchema,
} from '@/infrastructure/schemas/Cart.schema';
import { CreateCartDTO } from '@/application/dtos/Cart.dto';
import { CartService } from '@/services/Cart.service';
import { PrismaCartRepository } from '@/infrastructure/adapters/Cart.prisma-adapter';

const cartRepository = new PrismaCartRepository();
const cartService = new CartService(cartRepository);

export const cartActions = {
  getCarts: {
    handler: async (_ctx: Context) => {
      return await cartService.getAllCarts().catch(errorHandler);
    },
    openapi: {
      description: 'Recupera todas as carretas',
      summary: 'Recupera todas as carretas',
    },
  },

  getCartById: {
    handler: async (ctx: Context<StandardParameter<CreateCartDTO>>) => {
      const { id } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      return await cartService.getCartById(id).catch(errorHandler);
    },
    openapi: {
      description: 'Recupera carreta pelo ID',
      summary: 'Recupera carreta pelo ID',
    },
  },

  createCart: {
    handler: async (ctx: Context<StandardParameter<CreateCartDTO>>) => {
      await cartCreationSchema.parseAsync(ctx.params).catch(errorHandler);
      return await cartService.createCart(ctx.params).catch(errorHandler);
    },
    openapi: {
      description: 'Criação de carreta',
      summary: 'Criação de carreta',
    },
    params: {
      plate: { type: 'string', optional: false },
      isActive: { type: 'boolean', optional: true },
    },
  },

  editCart: {
    handler: async (ctx: Context<StandardParameter<CreateCartDTO>>) => {
      const { id, ...dto } = ctx.params;
      await uuidSchema.parseAsync(id).catch(errorHandler);
      await cartEditSchema.parseAsync(dto).catch(errorHandler);
      return await cartService.editCart(id, dto).catch(errorHandler);
    },
    openapi: {
      description: 'Edição de carreta',
      summary: 'Edição de carreta',
    },
    params: {
      plate: { type: 'string', optional: true },
      isActive: { type: 'boolean', optional: true },
    },
  },
};
