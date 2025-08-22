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
});
