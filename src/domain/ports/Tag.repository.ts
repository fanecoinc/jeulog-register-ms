import { Tag } from '../entities/Tag';

export interface ITagRepository {
  getAll(): Promise<Tag[]>;
  create(tag: Tag): Promise<Tag>;
  findById(id: string): Promise<Tag | null>;
  update(id: string, tag: Partial<Tag>): Promise<Tag>;
  delete(id: string): Promise<void>;
}
