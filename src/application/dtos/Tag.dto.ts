import { Tag } from '@/domain/entities/Tag';

export interface CreateTagDTO {
  name: string;
}

export interface UpdateTagDTO {
  name?: string;
}

export interface TagResponseDTO {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export function toTagResponseDTO(tag: Tag): TagResponseDTO {
  return {
    id: tag.id,
    name: tag.name,
    createdAt: tag.createdAt,
    updatedAt: tag.updatedAt,
    deletedAt: tag.deletedAt,
  };
}
