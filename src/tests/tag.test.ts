import { Tag } from '@/domain/entities/Tag';
import broker from '@/infrastructure/broker/service-broker';
import { prismaClient } from '@/infrastructure/database';

describe('Tag Service E2E', () => {
  beforeAll(async () => {
    await prismaClient.$connect();
    await broker.start();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
    await broker.stop();
  });

  it('should create a tag', async () => {
    const tagData = {
      name: 'Test Tag',
    };

    const response: Tag = await broker.call('tag.createTag', tagData);
    expect(response).toHaveProperty('id');
    expect(response.name).toBe(tagData.name);
  });
});
