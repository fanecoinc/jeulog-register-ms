import { TruckSetUseCase } from '@/application/useCases/TruckSet.use-case';
import {
  CreateTruckSetDTO,
  UpdateTruckSetDTO,
  TruckSetResponseDTO,
} from '@/application/dtos/TruckSet.dto';
import { ITruckSetRepository } from '@/domain/ports/TruckSet.repository';
import { ITruckTractorRepository } from '@/domain/ports/TruckTractor.repository';
import { ICartRepository } from '@/domain/ports/Cart.repository';
import { IPersonRepository } from '@/domain/ports/Person.repository';

export class TruckSetService {
  private truckSetUseCase: TruckSetUseCase;

  constructor(
    private truckSetRepository: ITruckSetRepository,
    private truckTractorRepository: ITruckTractorRepository,
    private personRepository: IPersonRepository,
    private cartRepository: ICartRepository
  ) {
    this.truckSetUseCase = new TruckSetUseCase(
      this.truckSetRepository,
      this.truckTractorRepository,
      this.personRepository,
      this.cartRepository
    );
  }

  async getAllTruckSets(): Promise<TruckSetResponseDTO[]> {
    return await this.truckSetUseCase.getAllTruckSets();
  }

  async getTruckSetById(id: string): Promise<TruckSetResponseDTO> {
    return await this.truckSetUseCase.getTruckSetById(id);
  }

  async createTruckSet(dto: CreateTruckSetDTO): Promise<TruckSetResponseDTO> {
    return await this.truckSetUseCase.createTruckSet(dto);
  }

  async editTruckSet(
    id: string,
    dto: UpdateTruckSetDTO
  ): Promise<TruckSetResponseDTO> {
    return await this.truckSetUseCase.updateTruckSet(id, dto);
  }

  async deleteTruckSet(id: string): Promise<void> {
    return await this.truckSetUseCase.deleteTruckSet(id);
  }
}
