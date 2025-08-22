import { TruckSet } from '@/domain/entities/TruckSet';
import { Cart } from '@/domain/entities/Cart';
import { Person } from '@/domain/entities/Person';
import { TruckTractor } from '@/domain/entities/TruckTractor';
import broker from '@/infrastructure/broker/service-broker';
import { prismaClient } from '@/infrastructure/database';
import { TruckSetStatus } from '@/domain/enums/TruckSetStatus';

describe('TruckSet Service E2E Tests', () => {
  beforeAll(async () => {
    await broker.start();
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await broker.stop();
    await prismaClient.$disconnect();
  });

  it('should retrieve all truck sets', async () => {
    const truckSets: TruckSet[] = await broker.call('register.getTruckSets');
    expect(truckSets).toBeInstanceOf(Array);
  });

  it('should create a new truck set', async () => {
    const ownerPersonData = {
      legalPerson: false,
      document: '55566677789',
      name: 'Owner Person',
      city: 'Edit City',
      state: 'EC',
      cep: '55566-778',
      isHeadquarter: false,
      isOrigin: false,
      isDestiny: false,
      isCarrier: true,
      isActive: true,
      tagIds: [],
    };

    const createdOwnerPerson: Person = await broker.call(
      'register.createPerson',
      ownerPersonData
    );

    const cartData = {
      plate: 'ABD-1934',
      isActive: true,
    };

    const createdCart: Cart = await broker.call(
      'register.createCart',
      cartData
    );

    const truckTractorData = {
      plate: 'GHI9019',
      isTruck: false,
    };

    const createdTruckTractor: TruckTractor = await broker.call(
      'register.createTruckTractor',
      truckTractorData
    );

    const truckSetData = {
      dedicatedFleet: true,
      blockedDescription: 'Test Blocked Description',
      truckTractorId: createdTruckTractor.id,
      cartOneId: createdCart.id,
      ownerId: createdOwnerPerson.id,
    };

    const createdTruckSet: TruckSet = await broker.call(
      'register.createTruckSet',
      truckSetData
    );

    expect(createdTruckSet.dedicatedFleet).toBe(truckSetData.dedicatedFleet);
    expect(createdTruckSet.blockedDescription).toBe(
      truckSetData.blockedDescription
    );
    expect(createdTruckSet.truckTractor.id).toBe(truckSetData.truckTractorId);
    expect(createdTruckSet.cartOne?.id).toBe(truckSetData.cartOneId);
    expect(createdTruckSet.owner.id).toBe(truckSetData.ownerId);
    expect(createdTruckSet.status).toBe(TruckSetStatus.AVAILABLE);
  });

  it('should find a truck set by ID', async () => {
    const ownerPersonData = {
      legalPerson: false,
      document: '55566675789',
      name: 'Second Owner Person',
      city: 'Edit City',
      state: 'EC',
      cep: '55566-778',
      polygon:
        'POLYGON((-43.75 -19.75, -43.70 -19.77, -43.68 -19.72, -43.72 -19.68, -43.77 -19.70, -43.75 -19.75))',
      isHeadquarter: false,
      isOrigin: false,
      isDestiny: false,
      isCarrier: true,
      isActive: true,
      tagIds: [],
    };

    const createdOwnerPerson: Person = await broker.call(
      'register.createPerson',
      ownerPersonData
    );

    const cartData = {
      plate: 'ABD-1994',
      isActive: true,
    };

    const createdCart: Cart = await broker.call(
      'register.createCart',
      cartData
    );

    const truckTractorData = {
      plate: 'GHI9819',
      isTruck: false,
    };

    const createdTruckTractor: TruckTractor = await broker.call(
      'register.createTruckTractor',
      truckTractorData
    );

    const truckSetData = {
      dedicatedFleet: true,
      blockedDescription: 'Test Blocked Description',
      truckTractorId: createdTruckTractor.id,
      cartOneId: createdCart.id,
      ownerId: createdOwnerPerson.id,
    };

    const createdTruckSet: TruckSet = await broker.call(
      'register.createTruckSet',
      truckSetData
    );

    const foundTruckSet: TruckSet = await broker.call(
      'register.getTruckSetById',
      { id: createdTruckSet.id }
    );

    expect(foundTruckSet).toBeDefined();
    expect(foundTruckSet.id).toBe(createdTruckSet.id);
    expect(foundTruckSet.dedicatedFleet).toBe(truckSetData.dedicatedFleet);
    expect(foundTruckSet.blockedDescription).toBe(
      truckSetData.blockedDescription
    );
    expect(foundTruckSet.truckTractor.id).toBe(truckSetData.truckTractorId);
    expect(foundTruckSet.cartOne?.id).toBe(truckSetData.cartOneId);
    expect(foundTruckSet.owner.id).toBe(truckSetData.ownerId);
    expect(foundTruckSet.status).toBe(TruckSetStatus.AVAILABLE);
  });

  it('should edit an existing truck set', async () => {
    const ownerPersonData = {
      legalPerson: false,
      document: '99566675789',
      name: 'Third Owner Person',
      city: 'Edit City',
      state: 'EC',
      cep: '55566-778',
      polygon:
        'POLYGON((-43.75 -19.75, -43.70 -19.77, -43.68 -19.72, -43.72 -19.68, -43.77 -19.70, -43.75 -19.75))',
      isHeadquarter: false,
      isOrigin: false,
      isDestiny: false,
      isCarrier: true,
      isActive: true,
      tagIds: [],
    };

    const createdOwnerPerson: Person = await broker.call(
      'register.createPerson',
      ownerPersonData
    );

    const cartData = {
      plate: 'PTD-1904',
      isActive: true,
    };

    const createdCart: Cart = await broker.call(
      'register.createCart',
      cartData
    );

    const truckTractorData = {
      plate: 'GHG9399',
      isTruck: false,
    };

    const createdTruckTractor: TruckTractor = await broker.call(
      'register.createTruckTractor',
      truckTractorData
    );

    const truckSetData = {
      dedicatedFleet: true,
      blockedDescription: 'Test Blocked Description',
      truckTractorId: createdTruckTractor.id,
      cartOneId: createdCart.id,
      ownerId: createdOwnerPerson.id,
    };

    const createdTruckSet: TruckSet = await broker.call(
      'register.createTruckSet',
      truckSetData
    );

    const updatedData = {
      id: createdTruckSet.id,
      dedicatedFleet: false,
      blockedDescription: 'Updated Blocked Description',
    };

    const updatedTruckSet: TruckSet = await broker.call(
      'register.editTruckSet',
      updatedData
    );

    expect(updatedTruckSet.id).toBe(createdTruckSet.id);
    expect(updatedTruckSet.dedicatedFleet).toBe(updatedData.dedicatedFleet);
    expect(updatedTruckSet.blockedDescription).toBe(
      updatedData.blockedDescription
    );
    expect(updatedTruckSet.truckTractor.id).toBe(truckSetData.truckTractorId);
    expect(updatedTruckSet.cartOne?.id).toBe(truckSetData.cartOneId);
    expect(updatedTruckSet.owner.id).toBe(truckSetData.ownerId);
    expect(updatedTruckSet.status).toBe(TruckSetStatus.AVAILABLE);
  });

  it('should delete a truck set', async () => {
    const ownerPersonData = {
      legalPerson: false,
      document: '55566675789',
      name: 'Fourth Owner Person',
      city: 'Edit City',
      state: 'EC',
      cep: '55566-778',
      polygon:
        'POLYGON((-43.75 -19.75, -43.70 -19.77, -43.68 -19.72, -43.72 -19.68, -43.77 -19.70, -43.75 -19.75))',
      isHeadquarter: false,
      isOrigin: false,
      isDestiny: false,
      isCarrier: true,
      isActive: true,
      tagIds: [],
    };

    const createdOwnerPerson: Person = await broker.call(
      'register.createPerson',
      ownerPersonData
    );

    const cartData = {
      plate: 'ATD-1954',
      isActive: true,
    };

    const createdCart: Cart = await broker.call(
      'register.createCart',
      cartData
    );

    const truckTractorData = {
      plate: 'GPI9819',
      isTruck: false,
    };

    const createdTruckTractor: TruckTractor = await broker.call(
      'register.createTruckTractor',
      truckTractorData
    );

    const truckSetData = {
      dedicatedFleet: true,
      blockedDescription: 'Test Blocked Description',
      truckTractorId: createdTruckTractor.id,
      cartOneId: createdCart.id,
      ownerId: createdOwnerPerson.id,
    };

    const createdTruckSet: TruckSet = await broker.call(
      'register.createTruckSet',
      truckSetData
    );

    const deletedTruckSet: TruckSet = await broker.call(
      'register.deleteTruckSet',
      {
        id: createdTruckSet.id,
      }
    );

    expect(deletedTruckSet).toBeUndefined();
  });
});
