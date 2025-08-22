import { Person } from '@/domain/entities/Person';
import broker from '@/infrastructure/broker/service-broker';
import { prismaClient } from '@/infrastructure/database';

describe('Person Service E2E Tests', () => {
  beforeAll(async () => {
    await broker.start();
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await broker.stop();
    await prismaClient.$disconnect();
  });

  it('should retrieve all persons', async () => {
    const persons: Person[] = await broker.call('register.getPersons');
    expect(persons).toBeInstanceOf(Array);
  });

  it('should create a new person', async () => {
    const personData = {
      legalPerson: false,
      document: '12345678901',
      name: 'John Doe',
      city: 'Sample City',
      state: 'SC',
      cep: '12345-678',
      polygon:
        'POLYGON((-43.95 -19.95, -43.90 -19.97, -43.88 -19.92, -43.92 -19.88, -43.97 -19.90, -43.95 -19.95))',
      isHeadquarter: true,
      isOrigin: false,
      isDestiny: false,
      isCarrier: false,
      isActive: true,
      tagIds: [],
    };

    const createdPerson: Person = await broker.call(
      'register.createPerson',
      personData
    );

    expect(createdPerson.name).toBe(personData.name);
    expect(createdPerson.document).toBe(personData.document);
    expect(createdPerson.city).toBe(personData.city);
    expect(createdPerson.state).toBe(personData.state);
    expect(createdPerson.cep).toBe(personData.cep);
    expect(createdPerson.polygon).toBe(personData.polygon);
    expect(createdPerson.isHeadquarter).toBe(personData.isHeadquarter);
    expect(createdPerson.isOrigin).toBe(personData.isOrigin);
    expect(createdPerson.isDestiny).toBe(personData.isDestiny);
    expect(createdPerson.isCarrier).toBe(personData.isCarrier);
    expect(createdPerson.isActive).toBe(personData.isActive);
    expect(createdPerson.tags).toBeInstanceOf(Array);
  });

  it('should find a person by ID', async () => {
    const personData = {
      legalPerson: false,
      document: '98765432100',
      name: 'Jane Smith',
      city: 'Another City',
      state: 'AC',
      cep: '87654-321',
      polygon:
        'POLYGON((-43.85 -19.85, -43.80 -19.87, -43.78 -19.82, -43.82 -19.78, -43.87 -19.80, -43.85 -19.85))',
      isHeadquarter: false,
      isOrigin: true,
      isDestiny: false,
      isCarrier: false,
      isActive: true,
      tagIds: [],
    };
    const createdPerson: Person = await broker.call(
      'register.createPerson',
      personData
    );
    const foundPerson: Person = await broker.call('register.getPersonById', {
      id: createdPerson.id,
    });
    expect(foundPerson).toBeDefined();
    expect(foundPerson.id).toBe(createdPerson.id);
    expect(foundPerson.name).toBe(personData.name);
    expect(foundPerson.document).toBe(personData.document);
    expect(foundPerson.city).toBe(personData.city);
    expect(foundPerson.state).toBe(personData.state);
    expect(foundPerson.cep).toBe(personData.cep);
    expect(foundPerson.polygon).toBe(personData.polygon);
    expect(foundPerson.isHeadquarter).toBe(personData.isHeadquarter);
    expect(foundPerson.isOrigin).toBe(personData.isOrigin);
    expect(foundPerson.isDestiny).toBe(personData.isDestiny);
    expect(foundPerson.isCarrier).toBe(personData.isCarrier);
    expect(foundPerson.isActive).toBe(personData.isActive);
    expect(foundPerson.tags).toBeInstanceOf(Array);
  });

  it('should edit an existing person', async () => {
    const personData = {
      legalPerson: false,
      document: '55566677788',
      name: 'Editable Person',
      city: 'Edit City',
      state: 'EC',
      cep: '55566-778',
      polygon:
        'POLYGON((-43.75 -19.75, -43.70 -19.77, -43.68 -19.72, -43.72 -19.68, -43.77 -19.70, -43.75 -19.75))',
      isHeadquarter: false,
      isOrigin: false,
      isDestiny: true,
      isCarrier: false,
      isActive: true,
      tagIds: [],
    };

    const createdPerson: Person = await broker.call(
      'register.createPerson',
      personData
    );

    const updatedData = {
      id: createdPerson.id,
      name: 'Updated Person',
      city: 'Updated City',
      isActive: false,
    };

    const updatedPerson: Person = await broker.call(
      'register.editPerson',
      updatedData
    );

    expect(updatedPerson.id).toBe(createdPerson.id);
    expect(updatedPerson.name).toBe(updatedData.name);
    expect(updatedPerson.city).toBe(updatedData.city);
    expect(updatedPerson.isActive).toBe(updatedData.isActive);
    expect(updatedPerson.document).toBe(personData.document);
    expect(updatedPerson.state).toBe(personData.state);
    expect(updatedPerson.cep).toBe(personData.cep);
    expect(updatedPerson.polygon).toBe(personData.polygon);
    expect(updatedPerson.isHeadquarter).toBe(personData.isHeadquarter);
    expect(updatedPerson.isOrigin).toBe(personData.isOrigin);
    expect(updatedPerson.isDestiny).toBe(personData.isDestiny);
    expect(updatedPerson.isCarrier).toBe(personData.isCarrier);
    expect(updatedPerson.tags).toBeInstanceOf(Array);
  });
});
