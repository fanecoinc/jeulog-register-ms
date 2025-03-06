import { ITruckTractorRepository } from '@/domain/ports/TruckTractor.repository';
import { prismaClient } from '../database';
import { TruckTractor } from '@/domain/entities/TruckTractor';

export class PrismaTruckTractorRepository implements ITruckTractorRepository {
  private mapToTruckTrackEntity(instance: Record<string, any>): TruckTractor {
    return new TruckTractor(
      instance.id,
      instance.plate,
      instance.isTruck,
      instance.isActive,
      instance.createdAt,
      instance.updatedAt ?? undefined
    );
  }

  async getAll(): Promise<TruckTractor[]> {
    const truckTractors = await prismaClient.truckTractor.findMany();
    return truckTractors.map(this.mapToTruckTrackEntity);
  }

  async create(truckTractor: TruckTractor): Promise<TruckTractor> {
    const createdTruckTractor = await prismaClient.truckTractor.create({
      data: {
        id: truckTractor.id,
        plate: truckTractor.plate,
        isTruck: truckTractor.isTruck,
        isActive: truckTractor.isActive,
        createdAt: truckTractor.createdAt,
      },
    });

    return this.mapToTruckTrackEntity(createdTruckTractor);
  }

  async findById(id: string): Promise<TruckTractor | null> {
    const truckTractor = await prismaClient.truckTractor.findUnique({
      where: { id },
    });
    if (!truckTractor) {
      return null;
    }

    return this.mapToTruckTrackEntity(truckTractor);
  }

  async update(
    id: string,
    truckTractor: Partial<TruckTractor>
  ): Promise<TruckTractor> {
    const updatedTruckTractor = await prismaClient.truckTractor.update({
      where: { id },
      data: {
        ...truckTractor,
        updatedAt: new Date(),
      },
    });

    return this.mapToTruckTrackEntity(updatedTruckTractor);
  }
}
