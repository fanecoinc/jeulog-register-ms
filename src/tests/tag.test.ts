import { Tag } from '@/domain/entities/Tag';
import broker from '@/infrastructure/broker/service-broker';
import { prismaClient } from '@/infrastructure/database';

describe('Tag Service E2E Tests', () => {
  beforeAll(async () => {
    await broker.start();
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await broker.stop();
    await prismaClient.$disconnect();
  });

  it('should retrieve all tags', async () => {
    const tags: Tag[] = await broker.call('register.getTags');
    expect(tags).toBeInstanceOf(Array);
  });

  it('should create a new tag', async () => {
    const tagData = {
      name: 'New Tag',
    };

    const createdTag: Tag = await broker.call('register.createTag', tagData);

    expect(createdTag.name).toBe(tagData.name);
  });

  it('should find a tag by ID', async () => {
    const tagData = {
      name: 'Find Me',
    };

    const createdTag: Tag = await broker.call('register.createTag', tagData);
    const foundTag: Tag = await broker.call('register.getTagById', {
      id: createdTag.id,
    });

    expect(foundTag).toBeDefined();
    expect(foundTag.id).toBe(createdTag.id);
    expect(foundTag.name).toBe(tagData.name);
  });

  it('should edit an existing tag', async () => {
    const tagData = {
      name: 'Editable Tag',
    };

    const createdTag: Tag = await broker.call('register.createTag', tagData);

    const updatedData = {
      id: createdTag.id,
      name: 'Updated Tag',
    };

    const updatedTag: Tag = await broker.call('register.editTag', updatedData);

    expect(updatedTag.id).toBe(createdTag.id);
    expect(updatedTag.name).toBe(updatedData.name);
  });

  it('should delete a tag', async () => {
    const tagData = {
      name: 'Deletable Tag',
    };

    const createdTag: Tag = await broker.call('register.createTag', tagData);
    const deletedTag: Tag = await broker.call('register.deleteTag', {
      id: createdTag.id,
    });

    expect(deletedTag).toBeUndefined();
  });
});
