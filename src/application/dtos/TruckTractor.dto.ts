import { TruckTractor } from '@/domain/entities/TruckTractor';

export interface CreateTruckTractorDTO {
  plate: string;
  isTruck: boolean;
  isActive?: boolean;
}

export interface UpdateTruckTractorDTO {
  plate?: string;
  isTruck?: boolean;
  isActive?: boolean;
}

export interface TruckTractorResponseDTO {
  id: string;
  plate: string;
  isTruck: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export function toTruckTractorResponseDTO(
  truckTractor: TruckTractor
): TruckTractorResponseDTO {
  return {
    id: truckTractor.id,
    plate: truckTractor.plate,
    isTruck: truckTractor.isTruck,
    isActive: truckTractor.isActive,
    createdAt: truckTractor.createdAt,
    updatedAt: truckTractor.updatedAt,
  };
}
