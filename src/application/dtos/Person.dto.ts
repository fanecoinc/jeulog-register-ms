import { Person } from '@/domain/entities/Person';

export interface CreatePersonDTO {
  legalPerson: boolean;
  document: string;
  name: string;
  city: string;
  state: string;
  cep: string;
  latitude?: number;
  longitude?: number;
  polygon: string;
  isHeadquarter: boolean;
  isOrigin: boolean;
  isDestiny: boolean;
  isCarrier: boolean;
  isActive?: boolean;
  tagIds?: string[];
}

export interface UpdatePersonDTO {
  legalPerson?: boolean;
  document?: string;
  name?: string;
  city?: string;
  state?: string;
  cep?: string;
  latitude?: number;
  longitude?: number;
  polygon?: string;
  isHeadquarter?: boolean;
  isOrigin?: boolean;
  isDestiny?: boolean;
  isCarrier?: boolean;
  isActive?: boolean;
  tagIds?: string[];
}

export interface PersonResponseDTO {
  id: string;
  legalPerson: boolean;
  document: string;
  name: string;
  city: string;
  state: string;
  cep: string;
  latitude?: number;
  longitude?: number;
  polygon: string;
  isHeadquarter: boolean;
  isOrigin: boolean;
  isDestiny: boolean;
  isCarrier: boolean;
  isActive: boolean;
  tags: { id: string; name: string }[];
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export function toPersonResponseDTO(person: Person): PersonResponseDTO {
  return {
    id: person.id,
    legalPerson: person.legalPerson,
    document: person.document,
    name: person.name,
    city: person.city,
    state: person.state,
    cep: person.cep,
    latitude: person.latitude,
    longitude: person.longitude,
    polygon: person.polygon,
    isHeadquarter: person.isHeadquarter,
    isOrigin: person.isOrigin,
    isDestiny: person.isDestiny,
    isCarrier: person.isCarrier,
    isActive: person.isActive,
    tags: person.tags.map((t) => ({
      id: t.id,
      name: t.name,
    })),
    createdAt: person.createdAt,
    updatedAt: person.updatedAt,
    deletedAt: person.deletedAt,
  };
}
