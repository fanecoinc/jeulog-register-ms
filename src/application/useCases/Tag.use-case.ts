import { ITagRepository } from '@/domain/ports/Tag.repository';
import { Errors } from 'moleculer';
import {
  CreateTagDTO,
  UpdateTagDTO,
  TagResponseDTO,
  toTagResponseDTO,
} from '../dtos/Tag.dto';
import { Tag } from '@/domain/entities/Tag';
import { v4 as uuidv4 } from 'uuid';

export class TagUseCase {
  constructor(private readonly tagRepository: ITagRepository) {}

  async getAllTags(): Promise<TagResponseDTO[]> {
    const tags = await this.tagRepository.getAll();
    return tags.map(toTagResponseDTO);
  }

  async createTag(dto: CreateTagDTO): Promise<TagResponseDTO> {
    const tag = new Tag(uuidv4(), dto.name, new Date());
    const createdTag = await this.tagRepository.create(tag);
    return toTagResponseDTO(createdTag);
  }

  async updateTag(id: string, dto: UpdateTagDTO): Promise<TagResponseDTO> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    }

    const updatedTag = await this.tagRepository.update(tag.id, dto);
    return toTagResponseDTO(updatedTag);
  }

  async getTagById(id: string): Promise<TagResponseDTO> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    }

    return toTagResponseDTO(tag);
  }

  async deleteTag(id: string): Promise<void> {
    const tag = await this.tagRepository.findById(id);
    if (!tag) {
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    }

    await this.tagRepository.delete(tag.id);

    return;
  }
}
