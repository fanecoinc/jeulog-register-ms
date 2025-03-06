import { CartUseCase } from '@/application/useCases/Cart.use-case';
import {
  CreateCartDTO,
  UpdateCartDTO,
  CartResponseDTO,
} from '@/application/dtos/Cart.dto';
import { ICartRepository } from '@/domain/ports/Cart.repository';

export class CartService {
  private cartUseCase: CartUseCase;

  constructor(private cartRepository: ICartRepository) {
    this.cartUseCase = new CartUseCase(this.cartRepository);
  }

  async getAllCarts(): Promise<CartResponseDTO[]> {
    return await this.cartUseCase.getAllCarts();
  }

  async getCartById(id: string): Promise<CartResponseDTO> {
    return await this.cartUseCase.getCartById(id);
  }

  async createCart(dto: CreateCartDTO): Promise<CartResponseDTO> {
    return await this.cartUseCase.createCart(dto);
  }

  async editCart(id: string, dto: UpdateCartDTO): Promise<CartResponseDTO> {
    return await this.cartUseCase.updateCart(id, dto);
  }
}
