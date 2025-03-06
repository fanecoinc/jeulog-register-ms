import { TruckTractorUseCase } from '@/application/useCases/TruckTractor.use-case';
import {
  CreateTruckTractorDTO,
  UpdateTruckTractorDTO,
  TruckTractorResponseDTO,
} from '@/application/dtos/TruckTractor.dto';
import { ITruckTractorRepository } from '@/domain/ports/TruckTractor.repository';

export class TruckTractorService {
  private truckTractorUseCase: TruckTractorUseCase;

  constructor(private truckTrackRepository: ITruckTractorRepository) {
    this.truckTractorUseCase = new TruckTractorUseCase(
      this.truckTrackRepository
    );
  }

  async getAllTruckTractors(): Promise<TruckTractorResponseDTO[]> {
    return await this.truckTractorUseCase.getAllTruckTractors();
  }

  async getTruckTractorById(id: string): Promise<TruckTractorResponseDTO> {
    return await this.truckTractorUseCase.getTruckTractorById(id);
  }

  async createTruckTractor(
    dto: CreateTruckTractorDTO
  ): Promise<TruckTractorResponseDTO> {
    return await this.truckTractorUseCase.createTruckTractor(dto);
  }

  async editTruckTractor(
    id: string,
    dto: UpdateTruckTractorDTO
  ): Promise<TruckTractorResponseDTO> {
    return await this.truckTractorUseCase.updateTruckTractor(id, dto);
  }
}
