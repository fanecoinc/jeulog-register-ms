import { ITruckTractorRepository } from '@/domain/ports/TruckTractor.repository';
import { Errors } from 'moleculer';
import {
  CreateTruckTractorDTO,
  UpdateTruckTractorDTO,
  TruckTractorResponseDTO,
  toTruckTractorResponseDTO,
} from '../dtos/TruckTractor.dto';
import { TruckTractor } from '@/domain/entities/TruckTractor';
import { v4 as uuidv4 } from 'uuid';

export class TruckTractorUseCase {
  constructor(
    private readonly truckTractorRepository: ITruckTractorRepository
  ) {}

  async getAllTruckTractors(): Promise<TruckTractorResponseDTO[]> {
    const truckTractors = await this.truckTractorRepository.getAll();
    return truckTractors.map(toTruckTractorResponseDTO);
  }

  async createTruckTractor(
    dto: CreateTruckTractorDTO
  ): Promise<TruckTractorResponseDTO> {
    const truckTractor = new TruckTractor(
      uuidv4(),
      dto.plate,
      dto.isTruck,
      dto.isActive ?? true,
      new Date()
    );
    const createdTag = await this.truckTractorRepository.create(truckTractor);
    return toTruckTractorResponseDTO(createdTag);
  }

  async updateTruckTractor(
    id: string,
    dto: UpdateTruckTractorDTO
  ): Promise<TruckTractorResponseDTO> {
    const truckTractor = await this.truckTractorRepository.findById(id);
    if (!truckTractor) {
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    }

    const updatedTruckTractor = await this.truckTractorRepository.update(
      truckTractor.id,
      dto
    );
    return toTruckTractorResponseDTO(updatedTruckTractor);
  }

  async getTruckTractorById(id: string): Promise<TruckTractorResponseDTO> {
    const truckTractor = await this.truckTractorRepository.findById(id);
    if (!truckTractor) {
      throw new Errors.MoleculerClientError(
        'Registro não encontrado',
        404,
        'P2025'
      );
    }

    return toTruckTractorResponseDTO(truckTractor);
  }
}
