import { Cart } from '../entities/Cart';

export interface ICartRepository {
  getAll(): Promise<Cart[]>;
  create(Cart: Cart): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
  update(id: string, Cart: Partial<Cart>): Promise<Cart>;
}
