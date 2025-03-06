import { ICartRepository } from '@/domain/ports/Cart.repository';
import { prismaClient } from '../database';
import { Cart } from '@/domain/entities/Cart';

export class PrismaCartRepository implements ICartRepository {
  private mapToCartEntity(instance: Record<string, any>): Cart {
    return new Cart(
      instance.id,
      instance.plate,
      instance.isActive,
      instance.createdAt,
      instance.updatedAt ?? undefined
    );
  }

  async getAll(): Promise<Cart[]> {
    const carts = await prismaClient.cart.findMany();
    return carts.map(this.mapToCartEntity);
  }

  async create(cart: Cart): Promise<Cart> {
    const createdCart = await prismaClient.cart.create({
      data: {
        id: cart.id,
        plate: cart.plate,
        isActive: cart.isActive,
        createdAt: cart.createdAt,
      },
    });

    return this.mapToCartEntity(createdCart);
  }

  async findById(id: string): Promise<Cart | null> {
    const cart = await prismaClient.cart.findUnique({
      where: { id },
    });
    if (!cart) {
      return null;
    }

    return this.mapToCartEntity(cart);
  }

  async update(id: string, cart: Partial<Cart>): Promise<Cart> {
    const updatedCart = await prismaClient.cart.update({
      where: { id },
      data: {
        ...cart,
        updatedAt: new Date(),
      },
    });

    return this.mapToCartEntity(updatedCart);
  }
}
