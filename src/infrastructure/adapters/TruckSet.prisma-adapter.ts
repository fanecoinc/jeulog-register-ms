import { ITruckSetRepository } from '@/domain/ports/TruckSet.repository';
import { prismaClient } from '../database';
import { TruckSet } from '@/domain/entities/TruckSet';
import { Person } from '@/domain/entities/Person';
import { Cart } from '@/domain/entities/Cart';
import { TruckTractor } from '@/domain/entities/TruckTractor';
import { Tag } from '@/domain/entities/Tag';

export class PrismaTruckSetRepository implements ITruckSetRepository {
  private mapToTruckSetEntity(instance: Record<string, any>): TruckSet {
    return new TruckSet(
      instance.id,
      instance.status,
      instance.dedicatedFleet,
      instance.isBlocked,
      new TruckTractor(
        instance.truckTractor.id,
        instance.truckTractor.plate,
        instance.truckTractor.isTruck,
        instance.truckTractor.isActive,
        instance.truckTractor.createdAt,
        instance.truckTractor.updatedAt
      ),
      new Person(
        instance.owner.id,
        instance.owner.legalPerson,
        instance.owner.document,
        instance.owner.name,
        instance.owner.state,
        instance.owner.state,
        instance.owner.cep,
        instance.owner.key,
        instance.owner.polygon,
        instance.owner.isHeadquarter,
        instance.owner.isOrigin,
        instance.owner.isDestiny,
        instance.owner.isCarrier,
        instance.owner.isActive,
        instance.owner.tags
          ? instance.owner.tags.map((p: any) => {
              return new Tag(p.tag.id, p.tag.name, p.tag.createdAt);
            })
          : [],
        instance.owner.createdAt,
        instance.owner.latitude ?? undefined,
        instance.owner.longitude ?? undefined,
        instance.owner.updatedAt ?? undefined
      ),
      instance.createdAt,
      instance.truckTractorId,
      instance.ownerId,
      instance.blockedDescription ?? undefined,
      instance.cartOne
        ? new Cart(
            instance.cartOne.id,
            instance.cartOne.plate,
            instance.cartOne.isActive,
            instance.cartOne.createdAt,
            instance.cartOne.updatedAt ?? undefined
          )
        : undefined,
      instance.cartTwo
        ? new Cart(
            instance.cartTwo.id,
            instance.cartTwo.plate,
            instance.cartTwo.isActive,
            instance.cartTwo.createdAt,
            instance.cartTwo.updatedAt ?? undefined
          )
        : undefined,
      instance.cartThree
        ? new Cart(
            instance.cartThree.id,
            instance.cartThree.plate,
            instance.cartThree.isActive,
            instance.cartThree.createdAt,
            instance.cartThree.updatedAt ?? undefined
          )
        : undefined
    );
  }

  async getAll(): Promise<TruckSet[]> {
    const truckSets = await prismaClient.truckSet.findMany();
    return truckSets.map(this.mapToTruckSetEntity);
  }

  async create(truckSet: TruckSet): Promise<TruckSet> {
    const createdTruckSet = await prismaClient.truckSet.create({
      data: {
        id: truckSet.id,
        status: truckSet.status,
        dedicatedFleet: truckSet.dedicatedFleet,
        isBlocked: truckSet.isBlocked,
        blockedDescription: truckSet.blockedDescription ?? null,
        truckTractorId: truckSet.truckTractorId,
        cartOneId: truckSet.cartOneId ?? null,
        cartTwoId: truckSet.cartTwoId ?? null,
        cartThreeId: truckSet.cartThreeId ?? null,
        ownerId: truckSet.ownerId,
        createdAt: truckSet.createdAt,
      },
    });

    return this.mapToTruckSetEntity(createdTruckSet);
  }

  async findById(id: string): Promise<TruckSet | null> {
    const truckSet = await prismaClient.truckSet.findUnique({
      where: { id },
    });

    if (!truckSet) {
      return null;
    }

    return this.mapToTruckSetEntity(truckSet);
  }

  async update(id: string, truckSet: Partial<TruckSet>): Promise<TruckSet> {
    const updatedTruckSet = await prismaClient.truckSet.update({
      where: { id },
      data: {
        id: truckSet.id,
        status: truckSet.status,
        dedicatedFleet: truckSet.dedicatedFleet,
        isBlocked: truckSet.isBlocked,
        blockedDescription: truckSet.blockedDescription ?? null,
        truckTractorId: truckSet.truckTractorId,
        cartOneId: truckSet.cartOneId ?? null,
        cartTwoId: truckSet.cartTwoId ?? null,
        cartThreeId: truckSet.cartThreeId ?? null,
        ownerId: truckSet.ownerId,
        createdAt: truckSet.createdAt,
      },
    });

    return this.mapToTruckSetEntity(updatedTruckSet);
  }

  async delete(id: string): Promise<null> {
    await prismaClient.truckSet.delete({
      where: { id },
    });

    return null;
  }
}
