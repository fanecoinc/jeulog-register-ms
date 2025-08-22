import { IPersonRepository } from '@/domain/ports/Person.repository';
import { prismaClient } from '../database';
import { Person } from '@/domain/entities/Person';
import { Tag } from '@/domain/entities/Tag';

export class PrismaPersonRepository implements IPersonRepository {
  private mapToPersonEntity(instance: Record<string, any>): Person {
    return new Person(
      instance.id,
      instance.legalPerson,
      instance.document,
      instance.name,
      instance.city,
      instance.state,
      instance.cep,
      instance.key,
      instance.isHeadquarter,
      instance.isOrigin,
      instance.isDestiny,
      instance.isCarrier,
      instance.isActive,
      instance.tags
        ? instance.tags.map((p: any) => {
            return new Tag(p.tag.id, p.tag.name, p.tag.createdAt);
          })
        : [],
      instance.createdAt,
      instance.polygon ?? undefined,
      instance.latitude ?? undefined,
      instance.longitude ?? undefined,
      instance.updatedAt
    );
  }

  async getAll(): Promise<Person[]> {
    const persons = await prismaClient.person.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return persons.map(this.mapToPersonEntity);
  }

  async create(person: Person): Promise<Person> {
    const createdPerson = await prismaClient.person.create({
      data: {
        id: person.id,
        legalPerson: person.legalPerson,
        document: person.document,
        name: person.name,
        city: person.city,
        state: person.state,
        cep: person.cep,
        key: person.key,
        polygon: person.polygon,
        isHeadquarter: person.isHeadquarter,
        isOrigin: person.isOrigin,
        isDestiny: person.isDestiny,
        isCarrier: person.isCarrier,
        isActive: person.isActive,
        tags: {
          create: person.tags.map((p) => ({
            tag: { connect: { id: p.id } },
          })),
        },
        createdAt: person.createdAt,
        latitude: person.latitude,
        longitude: person.longitude,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return this.mapToPersonEntity(createdPerson);
  }

  async findById(id: string): Promise<Person | null> {
    const person = await prismaClient.person.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!person) return null;

    return this.mapToPersonEntity(person);
  }

  async update(id: string, person: Partial<Person>): Promise<Person> {
    const [_personAfterReset, updatedPerson] = await prismaClient.$transaction([
      prismaClient.person.update({
        where: { id },
        data: {
          tags: person.tags
            ? {
                deleteMany: {},
              }
            : undefined,
        },
      }),

      prismaClient.person.update({
        where: { id },
        data: {
          id: person.id,
          legalPerson: person.legalPerson,
          document: person.document,
          name: person.name,
          city: person.city,
          state: person.state,
          cep: person.cep,
          key: person.key,
          polygon: person.polygon,
          isHeadquarter: person.isHeadquarter,
          isOrigin: person.isOrigin,
          isDestiny: person.isDestiny,
          isCarrier: person.isCarrier,
          isActive: person.isActive,
          tags: person.tags
            ? {
                create: person.tags.map((p) => ({
                  tag: { connect: { id: p.id } },
                })),
              }
            : undefined,
          createdAt: person.createdAt,
          latitude: person.latitude,
          longitude: person.longitude,
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      }),
    ]);

    return this.mapToPersonEntity(updatedPerson);
  }
}
