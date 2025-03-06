import { Cart } from '@/domain/entities/Cart';

export interface CreateCartDTO {
  plate: string;
  isActive?: boolean;
}

export interface UpdateCartDTO {
  plate?: string;
  isActive?: boolean;
}

export interface CartResponseDTO {
  id: string;
  plate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export function toCartResponseDTO(Cart: Cart): CartResponseDTO {
  return {
    id: Cart.id,
    plate: Cart.plate,
    isActive: Cart.isActive,
    createdAt: Cart.createdAt,
    updatedAt: Cart.updatedAt,
  };
}
