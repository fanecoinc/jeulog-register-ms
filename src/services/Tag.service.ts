import { TagUseCase } from '@/application/useCases/Tag.use-case';
import {
  CreateTagDTO,
  TagResponseDTO,
  UpdateTagDTO,
} from '@/application/dtos/Tag.dto';
import { ITagRepository } from '@/domain/ports/Tag.repository';

export class TagService {
  private tagUseCase: TagUseCase;

  constructor(private tagRepository: ITagRepository) {
    this.tagUseCase = new TagUseCase(this.tagRepository);
  }

  async getAllTags(): Promise<TagResponseDTO[]> {
    return await this.tagUseCase.getAllTags();
  }

  async getTagById(id: string): Promise<TagResponseDTO> {
    return await this.tagUseCase.getTagById(id);
  }

  async createTag(dto: CreateTagDTO): Promise<TagResponseDTO> {
    return await this.tagUseCase.createTag(dto);
  }

  async editTag(id: string, dto: UpdateTagDTO): Promise<TagResponseDTO> {
    return await this.tagUseCase.updateTag(id, dto);
  }

  async delete(id: string): Promise<void> {
    return await this.tagUseCase.deleteTag(id);
  }
}
