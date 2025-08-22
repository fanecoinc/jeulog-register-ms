import { TruckTractor } from '@/domain/entities/TruckTractor';
import broker from '@/infrastructure/broker/service-broker';
import { prismaClient } from '@/infrastructure/database';

describe('TruckTractor Service E2E Tests', () => {
  beforeAll(async () => {
    await broker.start();
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await broker.stop();
    await prismaClient.$disconnect();
  });

  it('should retrieve all truck tractors', async () => {
    const truckTractors: TruckTractor[] = await broker.call(
      'register.getTruckTractors'
    );
    expect(truckTractors).toBeInstanceOf(Array);
  });

  it('should create a new truck tractor', async () => {
    const truckTractorData = {
      plate: 'ABC1234',
      isTruck: true,
    };

    const createdTruckTractor: TruckTractor = await broker.call(
      'register.createTruckTractor',
      truckTractorData
    );

    expect(createdTruckTractor.plate).toBe(truckTractorData.plate);
    expect(createdTruckTractor.isTruck).toBe(truckTractorData.isTruck);
  });

  it('should find a truck tractor by ID', async () => {
    const truckTractorData = {
      plate: 'DEF5678',
      isTruck: false,
    };

    const createdTruckTractor: TruckTractor = await broker.call(
      'register.createTruckTractor',
      truckTractorData
    );
    const foundTruckTractor: TruckTractor = await broker.call(
      'register.getTruckTractorById',
      { id: createdTruckTractor.id }
    );

    expect(foundTruckTractor).toBeDefined();
    expect(foundTruckTractor.id).toBe(createdTruckTractor.id);
    expect(foundTruckTractor.plate).toBe(truckTractorData.plate);
    expect(foundTruckTractor.isTruck).toBe(truckTractorData.isTruck);
  });

  it('should edit an existing truck tractor', async () => {
    const truckTractorData = {
      plate: 'GHI9012',
      isTruck: true,
    };

    const createdTruckTractor: TruckTractor = await broker.call(
      'register.createTruckTractor',
      truckTractorData
    );

    const updatedData = {
      id: createdTruckTractor.id,
      plate: 'JKL3456',
      isTruck: false,
    };

    const updatedTruckTractor: TruckTractor = await broker.call(
      'register.editTruckTractor',
      updatedData
    );

    expect(updatedTruckTractor.id).toBe(createdTruckTractor.id);
    expect(updatedTruckTractor.plate).toBe(updatedData.plate);
    expect(updatedTruckTractor.isTruck).toBe(updatedData.isTruck);
  });
});
