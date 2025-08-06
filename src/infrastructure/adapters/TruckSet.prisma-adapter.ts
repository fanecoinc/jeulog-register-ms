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
}
