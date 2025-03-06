import { ICartRepository } from '@/domain/ports/Cart.repository';
import { Errors } from 'moleculer';
import {
  CreateCartDTO,
  UpdateCartDTO,
  CartResponseDTO,
  toCartResponseDTO,
} from '../dtos/Cart.dto';
import { Cart } from '@/domain/entities/Cart';
import { v4 as uuidv4 } from 'uuid';

export class CartUseCase {
  constructor(private readonly cartRepository: ICartRepository) {}

  async getAllCarts(): Promise<CartResponseDTO[]> {
    const carts = await this.cartRepository.getAll();
    return carts.map(toCartResponseDTO);
  }

  async createCart(dto: CreateCartDTO): Promise<CartResponseDTO> {
    const cart = new Cart(
      uuidv4(),
      dto.plate,
      dto.isActive ?? true,
      new Date()
    );
    const createdCart = await this.cartRepository.create(cart);
    return toCartResponseDTO(createdCart);
  }

  async updateCart(id: string, dto: UpdateCartDTO): Promise<CartResponseDTO> {
    const cart = await this.cartRepository.findById(id);
    if (!cart) {
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    }

    const updatedCart = await this.cartRepository.update(cart.id, dto);
    return toCartResponseDTO(updatedCart);
  }

  async getCartById(id: string): Promise<CartResponseDTO> {
    const cart = await this.cartRepository.findById(id);
    if (!cart) {
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    }

    return toCartResponseDTO(cart);
  }
}
