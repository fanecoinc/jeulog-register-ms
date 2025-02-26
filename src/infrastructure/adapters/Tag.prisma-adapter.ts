import { ITagRepository } from '@/domain/ports/Tag.repository';
import { prismaClient } from '../database';
import { Tag } from '@/domain/entities/Tag';

export class PrismaTagRepository implements ITagRepository {
  private mapToUserEntity(instance: Record<string, any>): Tag {
    return new Tag(
      instance.id,
      instance.name,
      instance.createdAt,
      instance.updatedAt ?? undefined,
      instance.deletedAt ?? undefined
    );
  }

  async getAll(): Promise<Tag[]> {
    const tags = await prismaClient.tag.findMany();
    return tags.map(this.mapToUserEntity);
  }

  async create(tag: Tag): Promise<Tag> {
    const createdTag = await prismaClient.tag.create({
      data: {
        id: tag.id,
        name: tag.name,
        createdAt: tag.createdAt,
      },
    });

    return this.mapToUserEntity(createdTag);
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await prismaClient.tag.findUnique({ where: { id } });
    if (!tag) {
      return null;
    }

    return this.mapToUserEntity(tag);
  }

  async update(id: string, tag: Partial<Tag>): Promise<Tag> {
    const updatedTag = await prismaClient.tag.update({
      where: { id },
      data: {
        ...tag,
        updatedAt: new Date(),
      },
    });

    return this.mapToUserEntity(updatedTag);
  }

  async delete(id: string): Promise<void> {
    await prismaClient.tag.delete({ where: { id } });
    return;
  }
}
