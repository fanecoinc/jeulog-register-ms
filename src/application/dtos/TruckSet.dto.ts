import { TruckSet } from '@/domain/entities/TruckSet';
import { TruckSetStatus } from '@/domain/enums/TruckSetStatus';

export interface CreateTruckSetDTO {
  status: TruckSetStatus;
  dedicatedFleet: boolean;
  isBlocked: boolean;
  blockedDescription?: string;
  truckTractorId: string;
  ownerId: string;
  cartOneId?: string;
  cartTwoId?: string;
  cartThreeId?: string;
}

export interface UpdateTruckSetDTO {
  status?: TruckSetStatus;
  dedicatedFleet?: boolean;
  isBlocked?: boolean;
  blockedDescription?: string;
  truckTractorId?: string;
  ownerId?: string;
  cartOneId?: string;
  cartTwoId?: string;
  cartThreeId?: string;
}

export interface TruckSetResponseDTO {
  id: string;
  status: TruckSetStatus;
  dedicatedFleet: boolean;
  isBlocked: boolean;
  blockedDescription?: string;
  truckTractor: {
    id: string;
    plate: string;
    isTruck: boolean;
    isActive: boolean;
    createdAt: Date;
  };
  owner: {
    id: string;
    name: string;
    polygon: string;
    isCarrier: boolean;
    isHeadquarter: boolean;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt?: Date;
  cartOne?: { id: string; plate: string; isActive: boolean; createdAt: Date };
  cartTwo?: { id: string; plate: string; isActive: boolean; createdAt: Date };
  cartThree?: { id: string; plate: string; isActive: boolean; createdAt: Date };
}

export function toTruckSetResponseDTO(truckSet: TruckSet): TruckSetResponseDTO {
  return {
    id: truckSet.id,
    status: truckSet.status,
    dedicatedFleet: truckSet.dedicatedFleet,
    isBlocked: truckSet.isBlocked,
    blockedDescription: truckSet.blockedDescription,
    truckTractor: {
      id: truckSet.truckTractor.id,
      plate: truckSet.truckTractor.plate,
      isTruck: truckSet.truckTractor.isTruck,
      isActive: truckSet.truckTractor.isActive,
      createdAt: truckSet.truckTractor.createdAt,
    },
    owner: {
      id: truckSet.owner.id,
      name: truckSet.owner.name,
      polygon: truckSet.owner.polygon,
      isCarrier: truckSet.owner.isCarrier,
      isHeadquarter: truckSet.owner.isHeadquarter,
      createdAt: truckSet.owner.createdAt,
    },
    createdAt: truckSet.createdAt,
    updatedAt: truckSet.updatedAt,
    cartOne: truckSet.cartOne
      ? {
          id: truckSet.cartOne.id,
          plate: truckSet.cartOne.plate,
          isActive: truckSet.cartOne.isActive,
          createdAt: truckSet.cartOne.createdAt,
        }
      : undefined,
    cartTwo: truckSet.cartTwo
      ? {
          id: truckSet.cartTwo.id,
          plate: truckSet.cartTwo.plate,
          isActive: truckSet.cartTwo.isActive,
          createdAt: truckSet.cartTwo.createdAt,
        }
      : undefined,
    cartThree: truckSet.cartThree
      ? {
          id: truckSet.cartThree.id,
          plate: truckSet.cartThree.plate,
          isActive: truckSet.cartThree.isActive,
          createdAt: truckSet.cartThree.createdAt,
        }
      : undefined,
  };
}
